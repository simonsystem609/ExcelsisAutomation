#include "dxf_thumbnail_core.h"

#include <objidl.h>
#include <shlobj.h>
#include <shobjidl.h>
#include <thumbcache.h>

#include <algorithm>
#include <array>
#include <atomic>
#include <cstdint>
#include <cwchar>
#include <new>
#include <vector>

namespace {

constexpr wchar_t kProviderClsidText[] = L"{5A957B88-4A4F-4D58-90A1-D0BFBC2E2939}";
constexpr wchar_t kProviderName[] = L"Excelsis DXF Thumbnail Provider";
constexpr wchar_t kThumbnailInterfaceText[] = L"{E357FCCD-A995-4576-B01F-234630154E96}";
constexpr wchar_t kPreviousProviderValue[] = L"PreviousThumbnailProvider";
constexpr GUID kProviderClsid = {
    0x5a957b88, 0x4a4f, 0x4d58, {0x90, 0xa1, 0xd0, 0xbf, 0xbc, 0x2e, 0x29, 0x39}};
constexpr GUID kInitializeWithStreamIid = {
    0xb824b49d, 0x22ac, 0x4161, {0xac, 0x8a, 0x99, 0x16, 0xe8, 0xfa, 0x3f, 0x7f}};
constexpr GUID kThumbnailProviderIid = {
    0xe357fccd, 0xa995, 0x4576, {0xb0, 0x1f, 0x23, 0x46, 0x30, 0x15, 0x4e, 0x96}};

HMODULE g_module = nullptr;
std::atomic<long> g_objectCount{0};
std::atomic<long> g_lockCount{0};

bool SameGuid(REFIID left, const GUID& right) {
  return InlineIsEqualGUID(left, right) != FALSE;
}

HRESULT ReadStream(IStream* stream, std::vector<std::uint8_t>* data) {
  if (stream == nullptr || data == nullptr) return E_POINTER;
  STATSTG stat{};
  HRESULT result = stream->Stat(&stat, STATFLAG_NONAME);
  if (FAILED(result)) return result;
  if (stat.cbSize.QuadPart <= 0) return HRESULT_FROM_WIN32(ERROR_BAD_FORMAT);
  if (stat.cbSize.QuadPart > static_cast<ULONGLONG>(excelsis::thumbnail::kMaxInputBytes)) {
    return HRESULT_FROM_WIN32(ERROR_FILE_TOO_LARGE);
  }

  LARGE_INTEGER origin{};
  result = stream->Seek(origin, STREAM_SEEK_SET, nullptr);
  if (FAILED(result)) return result;
  data->resize(static_cast<std::size_t>(stat.cbSize.QuadPart));
  std::size_t offset = 0;
  while (offset < data->size()) {
    const ULONG chunk = static_cast<ULONG>(std::min<std::size_t>(data->size() - offset, 1024u * 1024u));
    ULONG bytesRead = 0;
    result = stream->Read(data->data() + offset, chunk, &bytesRead);
    if (FAILED(result)) return result;
    if (bytesRead == 0) return HRESULT_FROM_WIN32(ERROR_HANDLE_EOF);
    offset += bytesRead;
  }
  return S_OK;
}

class ThumbnailProvider final : public IInitializeWithStream, public IThumbnailProvider {
 public:
  ThumbnailProvider() { ++g_objectCount; }

  ThumbnailProvider(const ThumbnailProvider&) = delete;
  ThumbnailProvider& operator=(const ThumbnailProvider&) = delete;

  IFACEMETHODIMP QueryInterface(REFIID iid, void** object) override {
    if (object == nullptr) return E_POINTER;
    *object = nullptr;
    if (SameGuid(iid, IID_IUnknown) || SameGuid(iid, kInitializeWithStreamIid)) {
      *object = static_cast<IInitializeWithStream*>(this);
    } else if (SameGuid(iid, kThumbnailProviderIid)) {
      *object = static_cast<IThumbnailProvider*>(this);
    } else {
      return E_NOINTERFACE;
    }
    AddRef();
    return S_OK;
  }

  IFACEMETHODIMP_(ULONG) AddRef() override {
    return static_cast<ULONG>(InterlockedIncrement(&references_));
  }

  IFACEMETHODIMP_(ULONG) Release() override {
    const ULONG references = static_cast<ULONG>(InterlockedDecrement(&references_));
    if (references == 0) delete this;
    return references;
  }

  IFACEMETHODIMP Initialize(IStream* stream, DWORD) override {
    if (stream == nullptr) return E_INVALIDARG;
    if (stream_ != nullptr) return HRESULT_FROM_WIN32(ERROR_ALREADY_INITIALIZED);
    stream_ = stream;
    stream_->AddRef();
    return S_OK;
  }

  IFACEMETHODIMP GetThumbnail(UINT pixels, HBITMAP* bitmap, WTS_ALPHATYPE* alphaType) override {
    if (bitmap == nullptr || alphaType == nullptr) return E_POINTER;
    *bitmap = nullptr;
    *alphaType = WTSAT_UNKNOWN;
    if (stream_ == nullptr) return E_UNEXPECTED;
    try {
      std::vector<std::uint8_t> data;
      HRESULT result = ReadStream(stream_, &data);
      if (FAILED(result)) return result;
      result = excelsis::thumbnail::RenderDxfThumbnail(data.data(), data.size(), pixels, bitmap);
      if (SUCCEEDED(result)) *alphaType = WTSAT_RGB;
      return result;
    } catch (const std::bad_alloc&) {
      return E_OUTOFMEMORY;
    } catch (...) {
      return E_FAIL;
    }
  }

 private:
  ~ThumbnailProvider() {
    if (stream_ != nullptr) stream_->Release();
    --g_objectCount;
  }

  volatile LONG references_ = 1;
  IStream* stream_ = nullptr;
};

class ClassFactory final : public IClassFactory {
 public:
  ClassFactory() { ++g_objectCount; }

  IFACEMETHODIMP QueryInterface(REFIID iid, void** object) override {
    if (object == nullptr) return E_POINTER;
    *object = nullptr;
    if (!SameGuid(iid, IID_IUnknown) && !SameGuid(iid, IID_IClassFactory)) return E_NOINTERFACE;
    *object = static_cast<IClassFactory*>(this);
    AddRef();
    return S_OK;
  }

  IFACEMETHODIMP_(ULONG) AddRef() override {
    return static_cast<ULONG>(InterlockedIncrement(&references_));
  }

  IFACEMETHODIMP_(ULONG) Release() override {
    const ULONG references = static_cast<ULONG>(InterlockedDecrement(&references_));
    if (references == 0) delete this;
    return references;
  }

  IFACEMETHODIMP CreateInstance(IUnknown* outer, REFIID iid, void** object) override {
    if (object == nullptr) return E_POINTER;
    *object = nullptr;
    if (outer != nullptr) return CLASS_E_NOAGGREGATION;
    ThumbnailProvider* provider = new (std::nothrow) ThumbnailProvider();
    if (provider == nullptr) return E_OUTOFMEMORY;
    const HRESULT result = provider->QueryInterface(iid, object);
    provider->Release();
    return result;
  }

  IFACEMETHODIMP LockServer(BOOL lock) override {
    if (lock) {
      ++g_lockCount;
    } else if (g_lockCount.load() > 0) {
      --g_lockCount;
    }
    return S_OK;
  }

 private:
  ~ClassFactory() { --g_objectCount; }
  volatile LONG references_ = 1;
};

HRESULT SetStringValue(HKEY key, const wchar_t* name, const wchar_t* value) {
  const DWORD bytes = static_cast<DWORD>((wcslen(value) + 1u) * sizeof(wchar_t));
  return HRESULT_FROM_WIN32(RegSetValueExW(
      key, name, 0, REG_SZ, reinterpret_cast<const BYTE*>(value), bytes));
}

HRESULT CreateKey(HKEY root, const wchar_t* path, HKEY* key) {
  DWORD disposition = 0;
  return HRESULT_FROM_WIN32(RegCreateKeyExW(
      root, path, 0, nullptr, REG_OPTION_NON_VOLATILE, KEY_READ | KEY_WRITE,
      nullptr, key, &disposition));
}

HRESULT RegisterProvider() {
  std::array<wchar_t, 32768> modulePath{};
  const DWORD pathLength = GetModuleFileNameW(g_module, modulePath.data(), static_cast<DWORD>(modulePath.size()));
  if (pathLength == 0 || pathLength >= modulePath.size()) return HRESULT_FROM_WIN32(GetLastError());

  wchar_t clsidPath[256]{};
  swprintf_s(clsidPath, L"Software\\Classes\\CLSID\\%s", kProviderClsidText);
  wchar_t associationPath[320]{};
  swprintf_s(
      associationPath,
      L"Software\\Classes\\SystemFileAssociations\\.dxf\\ShellEx\\%s",
      kThumbnailInterfaceText);
  HKEY clsidKey = nullptr;
  HRESULT result = CreateKey(HKEY_CURRENT_USER, clsidPath, &clsidKey);
  if (FAILED(result)) return result;
  result = SetStringValue(clsidKey, nullptr, kProviderName);
  wchar_t currentProvider[64]{};
  DWORD currentBytes = sizeof(currentProvider);
  const LONG currentResult = RegGetValueW(
      HKEY_CURRENT_USER,
      associationPath,
      nullptr,
      RRF_RT_REG_SZ,
      nullptr,
      currentProvider,
      &currentBytes);
  if (SUCCEEDED(result) && currentResult == ERROR_SUCCESS &&
      _wcsicmp(currentProvider, kProviderClsidText) != 0) {
    result = SetStringValue(clsidKey, kPreviousProviderValue, currentProvider);
  } else if (SUCCEEDED(result) &&
      (currentResult == ERROR_FILE_NOT_FOUND || currentResult == ERROR_PATH_NOT_FOUND)) {
    result = SetStringValue(clsidKey, kPreviousProviderValue, L"");
  } else if (SUCCEEDED(result) && currentResult == ERROR_SUCCESS) {
    DWORD previousType = 0;
    DWORD previousBytes = 0;
    if (RegQueryValueExW(
            clsidKey,
            kPreviousProviderValue,
            nullptr,
            &previousType,
            nullptr,
            &previousBytes) != ERROR_SUCCESS) {
      result = SetStringValue(clsidKey, kPreviousProviderValue, L"");
    }
  } else if (SUCCEEDED(result)) {
    result = HRESULT_FROM_WIN32(currentResult);
  }
  RegCloseKey(clsidKey);
  if (FAILED(result)) return result;

  wchar_t inprocPath[320]{};
  swprintf_s(inprocPath, L"%s\\InprocServer32", clsidPath);
  HKEY inprocKey = nullptr;
  result = CreateKey(HKEY_CURRENT_USER, inprocPath, &inprocKey);
  if (SUCCEEDED(result)) result = SetStringValue(inprocKey, nullptr, modulePath.data());
  if (SUCCEEDED(result)) result = SetStringValue(inprocKey, L"ThreadingModel", L"Apartment");
  if (inprocKey != nullptr) RegCloseKey(inprocKey);
  if (FAILED(result)) return result;

  HKEY associationKey = nullptr;
  result = CreateKey(HKEY_CURRENT_USER, associationPath, &associationKey);
  if (SUCCEEDED(result)) result = SetStringValue(associationKey, nullptr, kProviderClsidText);
  if (associationKey != nullptr) RegCloseKey(associationKey);
  if (FAILED(result)) return result;

  HKEY approvedKey = nullptr;
  result = CreateKey(
      HKEY_CURRENT_USER,
      L"Software\\Microsoft\\Windows\\CurrentVersion\\Shell Extensions\\Approved",
      &approvedKey);
  if (SUCCEEDED(result)) result = SetStringValue(approvedKey, kProviderClsidText, kProviderName);
  if (approvedKey != nullptr) RegCloseKey(approvedKey);
  SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, nullptr, nullptr);
  return result;
}

void UnregisterProvider() {
  wchar_t associationPath[320]{};
  swprintf_s(
      associationPath,
      L"Software\\Classes\\SystemFileAssociations\\.dxf\\ShellEx\\%s",
      kThumbnailInterfaceText);
  wchar_t currentProvider[64]{};
  wchar_t previousProvider[64]{};
  wchar_t clsidPath[256]{};
  swprintf_s(clsidPath, L"Software\\Classes\\CLSID\\%s", kProviderClsidText);
  DWORD previousBytes = sizeof(previousProvider);
  RegGetValueW(
      HKEY_CURRENT_USER,
      clsidPath,
      kPreviousProviderValue,
      RRF_RT_REG_SZ,
      nullptr,
      previousProvider,
      &previousBytes);
  DWORD valueBytes = sizeof(currentProvider);
  if (RegGetValueW(
          HKEY_CURRENT_USER,
          associationPath,
          nullptr,
          RRF_RT_REG_SZ,
          nullptr,
      currentProvider,
      &valueBytes) == ERROR_SUCCESS &&
      _wcsicmp(currentProvider, kProviderClsidText) == 0) {
    if (previousProvider[0] != L'\0') {
      HKEY associationKey = nullptr;
      if (SUCCEEDED(CreateKey(HKEY_CURRENT_USER, associationPath, &associationKey))) {
        const HRESULT restoreResult = SetStringValue(associationKey, nullptr, previousProvider);
        RegCloseKey(associationKey);
        if (FAILED(restoreResult)) RegDeleteTreeW(HKEY_CURRENT_USER, associationPath);
      } else {
        RegDeleteTreeW(HKEY_CURRENT_USER, associationPath);
      }
    } else {
      RegDeleteTreeW(HKEY_CURRENT_USER, associationPath);
    }
  }

  RegDeleteTreeW(HKEY_CURRENT_USER, clsidPath);
  HKEY approvedKey = nullptr;
  if (RegOpenKeyExW(
          HKEY_CURRENT_USER,
          L"Software\\Microsoft\\Windows\\CurrentVersion\\Shell Extensions\\Approved",
          0,
          KEY_SET_VALUE,
          &approvedKey) == ERROR_SUCCESS) {
    RegDeleteValueW(approvedKey, kProviderClsidText);
    RegCloseKey(approvedKey);
  }
  SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, nullptr, nullptr);
}

}  // namespace

BOOL WINAPI DllMain(HINSTANCE instance, DWORD reason, LPVOID) {
  if (reason == DLL_PROCESS_ATTACH) {
    g_module = instance;
    DisableThreadLibraryCalls(instance);
  }
  return TRUE;
}

extern "C" __declspec(dllexport) HRESULT __stdcall DllCanUnloadNow() {
  return g_objectCount.load() == 0 && g_lockCount.load() == 0 ? S_OK : S_FALSE;
}

extern "C" __declspec(dllexport) HRESULT __stdcall DllGetClassObject(
    REFCLSID clsid,
    REFIID iid,
    void** object) {
  if (object == nullptr) return E_POINTER;
  *object = nullptr;
  if (!InlineIsEqualGUID(clsid, kProviderClsid)) return CLASS_E_CLASSNOTAVAILABLE;
  ClassFactory* factory = new (std::nothrow) ClassFactory();
  if (factory == nullptr) return E_OUTOFMEMORY;
  const HRESULT result = factory->QueryInterface(iid, object);
  factory->Release();
  return result;
}

extern "C" __declspec(dllexport) HRESULT __stdcall DllRegisterServer() {
  return RegisterProvider();
}

extern "C" __declspec(dllexport) HRESULT __stdcall DllUnregisterServer() {
  UnregisterProvider();
  return S_OK;
}

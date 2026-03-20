const LOCAL_KEY = 'pci-agent-webapp-local-cache-v2';

export function saveLocalCache(data: unknown) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

export function loadLocalCache<T>() {
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}

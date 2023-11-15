"use client";

class EncryptedStorage {
  storage;
  constructor(storage: any) {
    this.storage = storage;
  }
  getItem(key: string) {
    const stored = this.storage.getItem(key);
    return stored ? JSON.parse(decodeURIComponent(btoa(stored))) : null;
  }
  setItem(key: string, data: unknown) {
    const storable = btoa(encodeURIComponent(JSON.stringify(data)));
    return this.storage.setItem(key, storable);
  }
  removeItem(key: string) {
    return this.storage.removeItem(key);
  }
  reset() {
    return this.storage.reset();
  }
}

const encryptedLocalStorage = new EncryptedStorage(localStorage);
const encryptedSessionStorage = new EncryptedStorage(sessionStorage);

export { encryptedLocalStorage, encryptedSessionStorage };

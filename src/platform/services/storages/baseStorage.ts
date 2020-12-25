export class BaseStorage  {

  set(key, data) {
    localStorage.setItem(key, data);
  }

  get(key) {
    return localStorage.getItem(key);
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  removeAll() {
    localStorage.clear();
  }
}

const map = new WeakMap();

const data = obj => map.get(obj);

class FileType {
  constructor(name, display, folder, apiEndpoint) {
    map.set(this, {
      name,
      display,
      folder,
      apiEndpoint,
    });
  }

  get name() {
    return data(this).name;
  }

  get display() {
    return data(this).display;
  }

  get folder() {
    return data(this).folder;
  }

  get apiEndpoint() {
    return data(this).apiEndpoint;
  }
}

export default FileType;

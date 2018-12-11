const map = new WeakMap();

const data = obj => map.get(obj);

class File {
  constructor(type, folder, name, size) {
    map.set(this, {
      type,
      folder,
      name,
      size,
    });
  }

  get type() {
    return data(this).type;
  }

  get typeName() {
    return data(this).type.name;
  }

  get name() {
    return data(this).name;
  }

  set name(name) {
    data(this).name = name;
  }

  get folder() {
    return data(this).folder;
  }

  set folder(folder) {
    data(this).folder = folder;
  }

  get size() {
    return data(this).size;
  }

  set size(size) {
    data(this).size = size;
  }

  get id() {
    return `${this.type.name}@${this.folder}/${this.name}`;
  }

  get progress() {
    return data(this).progress;
  }

  set progress(progress) {
    data(this).progress = progress;
  }

  isRemoteFile() {
    return this.folder.indexOf('/arcite/') === 0;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      folder: this.folder,
      size: this.size,
      progress: this.progress,
    };
  }
}

export default File;

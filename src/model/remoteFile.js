const map = new WeakMap();

const data = obj => map.get(obj);

class RemoteFile {
  static from(datasource, folder) {
    const type = !folder ? 'datasource' : 'folder';
    return new RemoteFile(type, datasource, folder, folder, '');
  }

  constructor(type, dataSource, folder, name, remotePath) {
    const f = folder || '';
    map.set(this, {
      type,
      dataSource,
      folder: f.indexOf('/') === 0 ? f : `/${f}`,
      name,
      remotePath,
    });
  }

  get type() {
    return data(this).type;
  }

  set type(type) {
    data(this).type = type;
  }

  get name() {
    return data(this).name;
  }

  set name(name) {
    data(this).name = name;
  }

  get remotePath() {
    return data(this).remotePath;
  }

  set remotePath(remotePath) {
    data(this).remotePath = remotePath;
  }

  get dataSource() {
    return data(this).dataSource;
  }

  set dataSource(dataSource) {
    data(this).dataSource = dataSource;
  }

  get folder() {
    return data(this).folder;
  }

  set folder(folder) {
    data(this).folder = folder;
  }

  get successorPath() {
    if (this.type === 'datasource') {
      return {
        dataSource: this.name,
        folder: '/',
      };
    }
    return {
      dataSource: this.dataSource,
      folder: this.folder.length === 1 ? this.name : `${this.folder}/${this.name}`,
    };
  }

  get predecessorPath() {
    return {
      dataSource: this.folder.length === 1 ? undefined : this.dataSource,
      folder: this.folder.length === 1 ? undefined : this.folder.substring(0, this.folder.lastIndexOf('/')),
    };
  }

  get path() {
    if (!this.dataSource && this.folder.length === 1) {
      return '/';
    }
    if (!this.name) {
      return '/';
    }
    if (this.folder.length === 1) {
      return `${this.folder}${this.name}`;
    }
    return `${this.folder}/${this.name}`;
  }


  get id() {
    return `${this.type.name}@${this.path}/${this.name}`;
  }

  isFile() {
    return this.type === 'file';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      remotePath: this.remotePath,
      path: this.path,
      dataSource: this.dataSource,
      folder: this.folder,
      type: this.type,
    };
  }
}

export default RemoteFile;

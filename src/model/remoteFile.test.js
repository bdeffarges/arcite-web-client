import RemoteFile from './remoteFile';

const file01 = new RemoteFile('datasource');
const file02 = new RemoteFile('datasource', 'nextSeq', '', 'test.txt', '');
const file03 = new RemoteFile('datasource', 'nextSeq', 'folder/subfolder', 'test.txt', '');
const file04 = new RemoteFile('datasource', 'nextSeq');

describe('Remote File', () => {
  it('can resolve the datasource of a file', () => {
    expect(file01.dataSource).toBeUndefined();
    expect(file02.dataSource).toBe('nextSeq');
    expect(file03.dataSource).toBe('nextSeq');
  });
  it('can resolve the folder of a file', () => {
    expect(file01.folder).toBe('/');
    expect(file02.folder).toBe('/');
    expect(file03.folder).toBe('/folder/subfolder');
  });
  it('can get the complete name of a file', () => {
    expect(file01.path).toBe('/');
    expect(file02.path).toBe('/test.txt');
    expect(file03.path).toBe('/folder/subfolder/test.txt');
    expect(file04.path).toBe('/');
  });
});


import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getUrl } from './api-utilities';
import { getRemoteFolderContent } from './api-experiments';

const mock = new MockAdapter(axios);
describe('getRemoteFolderContent', () => {
  it('can get a list of remote files for data sources', () => {
    const data = {
      sourceFolders: {
        microarray: 'agilent microarray scanner (/arcite/raw_data/microarrays)',
        nextSeq: 'illumina NextSeq (/arcite/raw_data/mps/nextseq)',
        catwalk: 'catwalk raw data  (/arcite/raw_data/catwalk)',
      },
    };
    mock.onGet(getUrl('/data_sources')).reply(200, data);
    return getRemoteFolderContent().then((d) => {
      expect(d).toHaveLength(3);
      expect(d[0].type).toBe('datasource');
      expect(d[0].name).toBe('microarray');
      expect(d[0].dataSource).toBeUndefined();
      expect(d[0].folder).toBe('/');
      expect(d[0].path).toBe('/');
    });
  });

  it('can get a list of files and folders starting at a data source', () => {
    const data = {
      files: [
        {
          fullPath: '/arcite/raw_data/mps/nextseq/170704_NB502046_0002_AHYM57BGX2',
          name: '170704_NB502046_0002_AHYM57BGX2',
          fileSize: '4 KB',
          fileType: 'folder',
        },
        {
          fullPath: '/arcite/raw_data/mps/nextseq/ABCD.csv',
          name: 'ABCD.csv',
          fileSize: '836 B',
          fileType: 'file',
        },
        {
          fullPath: '/arcite/raw_data/mps/nextseq/170704_NB502045_0002_AHYKY7BGX2',
          name: '170704_NB502045_0002_AHYKY7BGX2',
          fileSize: '4 KB',
          fileType: 'folder',
        },
      ],
    };

    mock.onGet(getUrl('/data_sources/nextSeq')).reply(200, data);

    return getRemoteFolderContent('nextSeq').then((d) => {
      expect(d).toHaveLength(3);
      expect(d[0].type).toBe('folder');
      expect(d[1].type).toBe('file');
      expect(d[2].type).toBe('folder');
    });
  });

  it('can get a list of files and folders starting at a random folder', () => {
    const data = {
      files: [
        {
          fullPath: '/arcite/raw_data/mps/nextseq/170704_NB502045_0002_AHYKY7BGX2/Config/NextSeqCalibration.cfg',
          name: 'NextSeqCalibration.cfg',
          fileSize: '6 KB',
          fileType: 'file',
        },
        {
          fullPath: '/arcite/raw_data/mps/nextseq/170704_NB502045_0002_AHYKY7BGX2/Config/NextSeqOverride.cfg',
          name: 'NextSeqOverride.cfg',
          fileSize: '152 B',
          fileType: 'file',
        },
        {
          fullPath: '/arcite/raw_data/mps/nextseq/170704_NB502045_0002_AHYKY7BGX2/Config/Effective.cfg',
          name: 'Effective.cfg',
          fileSize: '238 KB',
          fileType: 'file',
        },
        {
          fullPath: '/arcite/raw_data/mps/nextseq/170704_NB502045_0002_AHYKY7BGX2/Config/FirmwareVersions.txt',
          name: 'FirmwareVersions.txt',
          fileSize: '919 B',
          fileType: 'file',
        },
      ],
    };

    mock.onPost(getUrl('/data_sources')).reply(200, data);

    const dataSource = 'nextSeq';
    const folder = '/170704_NB502045_0002_AHYKY7BGX2/Config';
    return getRemoteFolderContent(dataSource, folder).then((d) => {
      expect(d).toHaveLength(4);
      expect(d[0].type).toBe('file');
      expect(d[1].type).toBe('file');
      expect(d[2].type).toBe('file');
      expect(d[3].type).toBe('file');
      expect(d[0].folder).toBe(`${folder}`);
    });
  });
});


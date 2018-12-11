import { getDesignFromCSV } from './csv-utils';

const csvData = 'SampleId,Wash,Batch,Barcode,Compound\n1,1,1,10000001,ACT-1000-0001\n2,2,1,10000001,Other\n3,1,2,10000002,ACT-1000-0001\n4,2,2,10000002,Other\n5,1,1,10000003,ACT-1000-0001\n6,2,1,10000003,Other\n7,1,2,10000004,ACT-1000-0001\n8,2,2,10000004,Other\n9,1,1,10000005,ACT-1000-0001\n10,2,1,10000005,Other\n11,1,2,10000006,ACT-1000-0001\n12,2,2,10000006,Other';
const csvDataCorrupt = 'SampleId,Wash,Batch,Barcode,Compound\n1,1,1,10000001,ACT-1000-0001\n2,2,1,100000';

describe('CSV file to design', () => {
  it('can read a design from a CSV data', () => {
    const design = getDesignFromCSV(csvData);
    expect(design.samples).toHaveLength(12);
  });

  it('can fails to read a corrupted design', () => {
    const read = () => {
      getDesignFromCSV(csvDataCorrupt);
    };
    expect(read).toThrowError('Could not read file');
  });
});

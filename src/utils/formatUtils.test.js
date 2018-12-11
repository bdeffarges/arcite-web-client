import { formatFileSize } from './format-utils';

describe('FormatUtils', () => {
  it('can format to file sizes', () => {
    expect(formatFileSize(50)).toBe('50B');
    expect(formatFileSize(1023)).toBe('1023B');
    expect(formatFileSize(1024)).toBe('1KB');
    expect(formatFileSize(20 * 1024 * 1024)).toBe('20MB');
    expect(formatFileSize(12 * 1024 * 1024 * 1024)).toBe('12GB');
  });
});

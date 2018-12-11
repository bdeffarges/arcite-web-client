import { getPalette } from './color_utils';

describe('ColorUtils', () => {
  it('can create a palette of distinct colors', () => {
    const count = 10;
    const palette = getPalette(count);
    expect(palette).toBeDefined();
    expect(palette).toHaveLength(count);
  });
});

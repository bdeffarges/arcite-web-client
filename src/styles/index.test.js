import styles from './index';

describe('getMargin(1)', () => {
  it('creates a margin of 0.25rem', () => {
    expect(styles.getMargin(1)).toEqual({ margin: '0.25rem' });
  });
});

describe('getMargin(-1)', () => {
  it('creates a margin of -0.25rem', () => {
    expect(styles.getMargin(-1)).toEqual({ margin: '-0.25rem' });
  });
});

describe('getMargin([1, auto])', () => {
  it('creates a margin of 0.25rem auto', () => {
    expect(styles.getMargin([1, 'auto'])).toEqual({ margin: '0.25rem auto' });
  });
});

describe('getMargin([-1, auto])', () => {
  it('creates a margin of -0.25rem auto', () => {
    expect(styles.getMargin([-1, 'auto'])).toEqual({ margin: '-0.25rem auto' });
  });
});

describe('getMargin([1, 2])', () => {
  it('creates a margin of 0.25rem 0.5rem', () => {
    expect(styles.getMargin([1, 2])).toEqual({ margin: '0.25rem 0.5rem' });
  });
});

describe('getMargin([-1, 2])', () => {
  it('creates a margin of -0.25rem 0.5rem', () => {
    expect(styles.getMargin([-1, 2])).toEqual({ margin: '-0.25rem 0.5rem' });
  });
});

describe('getMargin([1, -2])', () => {
  it('creates a margin of 0.25rem -0.5rem', () => {
    expect(styles.getMargin([1, -2])).toEqual({ margin: '0.25rem -0.5rem' });
  });
});

describe('getMargin([-1, -2])', () => {
  it('creates a margin of -0.25rem -0.5rem', () => {
    expect(styles.getMargin([-1, -2])).toEqual({ margin: '-0.25rem -0.5rem' });
  });
});

describe('getMargin([1, 2, 3, 4])', () => {
  it('creates a margin of 0.25rem 0.5rem 0.75rem 1rem', () => {
    expect(styles.getMargin([1, 2, 3, 4])).toEqual({ margin: '0.25rem 0.5rem 0.75rem 1rem' });
  });
});

describe('getPadding(8)', () => {
  it('creates a padding of 2rem', () => {
    expect(styles.getPadding(8)).toEqual({ padding: '2rem' });
  });
});

describe('getFontSize(3)', () => {
  it('creates a font size of 1.25rem', () => {
    expect(styles.getFontSize(3)).toEqual({ fontSize: '1.25rem' });
  });
});

describe('getLineHeight(3)', () => {
  it('creates the 1.625-times font size as line height', () => {
    expect(styles.getFontSize(1)).toEqual({ fontSize: '2rem' });
    expect(styles.getLineHeight(1)).toEqual({ lineHeight: '3.25rem' });
  });
});

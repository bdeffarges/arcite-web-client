import moment from 'moment';
import { getMomentFromApi } from './date-utils';

describe('getMomentFromApi', () => {
  it('returns null for an invalid API date', () => {
    expect(getMomentFromApi('2011/30/30-12:00:00')).toBeNull();
  });
  it('returns a moment for a valid API date', () => {
    const m = getMomentFromApi('2011/04/21-12:05:32');
    expect(m).not.toBeNull();
    expect(m).toBeInstanceOf(moment);
    expect(m.year()).toBe(2011);
    expect(m.month()).toBe(3);
    expect(m.date()).toBe(21);
    expect(m.hours()).toBe(12);
    expect(m.minutes()).toBe(5);
    expect(m.seconds()).toBe(32);
  });
});

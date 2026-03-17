import { PressRelease } from '../types';

export const sortByLatest = (releases: PressRelease[]): PressRelease[] => {
  return releases.sort(
    (a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
  );
};

export const sortByOldest = (releases: PressRelease[]): PressRelease[] => {
  return releases.sort(
    (a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime()
  );
};

export const applySort = (releases: PressRelease[], sortType: string): PressRelease[] => {
  if (sortType === 'oldest') return sortByOldest([...releases]);
  return sortByLatest([...releases]);
};

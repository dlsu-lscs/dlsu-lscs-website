import { PressRelease } from '../types';

export const filterByQuery = (releases: PressRelease[], query: string): PressRelease[] => {
  if (!query) return releases;
  return releases.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
};

export const filterByYear = (releases: PressRelease[], year: string): PressRelease[] => {
  if (!year) return releases;
  return releases.filter((item) => {
    const itemYear = item.date ? new Date(item.date).getFullYear().toString() : '';
    return itemYear === year;
  });
};

export const filterByAuthor = (releases: PressRelease[], author: string): PressRelease[] => {
  if (!author) return releases;
  return releases.filter((item) => item.author?.toLowerCase().includes(author.toLowerCase()));
};

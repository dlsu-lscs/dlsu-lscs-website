import { filterByQuery, filterByYear, filterByAuthor } from './filters';
import { applySort } from './sorters';
import { PressRelease } from '../types';

export const applyFiltersAndSort = (
  releases: PressRelease[],
  query: string,
  year: string,
  author: string,
  sort: string
): PressRelease[] => {
  let result = [...releases];
  result = filterByQuery(result, query);
  result = filterByYear(result, year);
  result = filterByAuthor(result, author);
  result = applySort(result, sort);
  return result;
};

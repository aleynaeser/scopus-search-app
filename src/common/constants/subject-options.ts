import { SCOPUS_SEARCH_SUBJECT } from '@scopus-search/src/enums';

export const subjectOptions = Object.keys(SCOPUS_SEARCH_SUBJECT).map((key) => ({
  id: key,
  key,
  name: SCOPUS_SEARCH_SUBJECT[key as keyof typeof SCOPUS_SEARCH_SUBJECT],
}));

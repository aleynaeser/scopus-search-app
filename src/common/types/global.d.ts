import { SCOPUS_SEARCH_SUBJECT } from '@scopus-search/src/enums';

declare global {
  type TServiceResponse<T> = {
    'search-results': {
      'opensearch:totalResults': string;
      'opensearch:startIndex': string;
      'opensearch:itemsPerPage': string;
      'opensearch:Query': TOpenSearchQuery;
      link: TScopusLink[];
      entry: T[];
    };
  };

  type TOpenSearchQuery = {
    '@role': string;
    '@searchTerms': string;
    '@startPage': string;
  };

  type TServiceListResponse<T> = TServiceResponse<T>;

  type TScopusLink = {
    '@_fa': string;
    '@ref': string;
    '@href': string;
    '@type'?: string;
  };

  type TServiceSearchParams = {
    query: string;
    start?: string;
    subj?: SCOPUS_SEARCH_SUBJECT;
  };
}

export interface IScopusSearchEntry {
  '@_fa': string;
  link: TScopusLink[];
  'prism:url': string;
  'dc:identifier': string;
  eid: string;
  'dc:title': string;
  'dc:creator': string;
  'prism:publicationName': string;
  'prism:issn': string;
  'prism:eIssn': string;
  'prism:volume': string;
  'prism:issueIdentifier'?: string;
  'prism:pageRange': string | null;
  'prism:coverDate': string;
  'prism:coverDisplayDate': string;
  'prism:doi': string;
  'citedby-count': string;
  affiliation: {
    '@_fa': string;
    affilname: string;
    'affiliation-city': string | null;
    'affiliation-country': string;
  }[];
  'prism:aggregationType': string;
  subtype: string;
  subtypeDescription: string;
  'source-id': string;
  openaccess: string;
  openaccessFlag: boolean;
  'article-number'?: string;
  pii?: string;
  freetoread?: {
    value: string;
  };
  freetoreadLabel?: {
    value: string;
  };
  'pubmed-id'?: string;
}

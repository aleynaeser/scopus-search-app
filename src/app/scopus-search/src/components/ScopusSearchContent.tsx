'use client';

import { Fragment } from 'react';
import { searchInScopus } from '../actions';
import { ColumnDef } from '@tanstack/react-table';
import { IScopusSearchEntry } from '../interfaces';
import SCTable from '@components/SCTable';
import ScopusSearchBar from './ScopusSearchBar';

interface IScopusSearchContentProps {
  searchParams: TServiceSearchParams;
  initialSearchData?: TServiceListResponse<IScopusSearchEntry>;
}

export default function ScopusSearchContent({ searchParams, initialSearchData }: IScopusSearchContentProps) {
  console.log('Scopus Search Data =>', initialSearchData);

  const columns: ColumnDef<IScopusSearchEntry, string>[] = [
    {
      header: 'Title',
      meta: { width: '200' },
      accessorFn: (row) => row['dc:title'],
    },
    {
      header: 'Authors',
      accessorFn: (row) => row['dc:creator'],
    },
    {
      header: 'Source',
      accessorFn: (row) => row['prism:publicationName'],
    },
    {
      header: 'Type',
      accessorFn: (row) => row['subtypeDescription'],
    },
    {
      header: 'Date',
      accessorFn: (row) => row['prism:coverDate'],
    },
  ];

  return (
    <Fragment>
      <SCTable<IScopusSearchEntry>
        id='scopus-search-table'
        tableKey='scopus-search-table'
        initialData={initialSearchData}
        SearchComponent={ScopusSearchBar}
        columns={columns}
        searchParams={searchParams}
        renderer={searchInScopus}
      />
    </Fragment>
  );
}

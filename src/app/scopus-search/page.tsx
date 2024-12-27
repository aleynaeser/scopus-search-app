import { Metadata } from 'next';
import { searchInScopus } from './src/actions';
import { TABLE_PER_PAGE } from '@components/SCTable';
import { ScopusSearchContextProvider } from './src/context/ScopusSearchContext';
import ScopusSearchContent from './src/components/ScopusSearchContent';

import './src/sass/scopus-search.scss';

export const metadata: Metadata = {
  title: 'Scopus Search',
  description: 'Scopus Search Page',
};

export default async function ScopusSearch({ searchParams }: { searchParams: TServiceSearchParams }) {
  const { query, start } = searchParams;
  const defaultSearchParams = { query: 'management-information-systems', start: '0' };

  const subject = searchParams.subj;
  const startPage = start ?? defaultSearchParams.start;
  const searchQuery = query?.trim() ?? defaultSearchParams.query;

  const initialSearchData = await searchInScopus({
    query: searchQuery,
    start: (Number(startPage) * TABLE_PER_PAGE).toString(),
    ...(subject ? { subj: subject } : undefined),
  });

  return (
    <ScopusSearchContextProvider>
      <main id='scopus-search' className='grid gap-16'>
        <ScopusSearchContent searchParams={{ query: searchQuery, start: startPage }} initialSearchData={initialSearchData} />
      </main>
    </ScopusSearchContextProvider>
  );
}

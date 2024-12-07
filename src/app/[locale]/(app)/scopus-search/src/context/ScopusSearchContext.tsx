'use client';

import { useManageStorage } from '@common/hooks';
import { createContext, useContext } from 'react';
import { IScopusSearchEntry } from '../interfaces';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { useQuery } from '@tanstack/react-query';

interface IScopusSearchContext {
  searchData?: TServiceListResponse<IScopusSearchEntry>;
}

const scopusSearchContext = createContext<IScopusSearchContext | undefined>(undefined);

export function ScopusSearchContextProvider({ children }: { children: React.ReactNode }) {
  const { getLocalStorageData } = useManageStorage<TServiceListResponse<IScopusSearchEntry>>();

  const { data } = useQuery({
    queryKey: ['get-scopus-search'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.SCOPUS_SEARCH),
  });

  return <scopusSearchContext.Provider value={{ searchData: data }}>{children}</scopusSearchContext.Provider>;
}

export const useScopusSearchContext = () => {
  const context = useContext(scopusSearchContext);
  if (context === undefined) {
    throw new Error('useScopusSearchContext must be used within a ScopusSearchContextProvider');
  }
  return context;
};

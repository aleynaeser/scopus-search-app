'use client';

import { useCallback, useState } from 'react';
import { usePathname } from '@i18n/routing';
import { useSearchParams } from 'next/navigation';

export type TQueryParams = {
  id: string;
  value: string | number | undefined;
};

export function useQueryString() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [query, setQueryString] = useState<string>('');
  const [queryParams, setQueryParams] = useState<TQueryParams[]>([]);

  const setQuery = useCallback(
    (params: TQueryParams[], push = false) => {
      const newParams = new URLSearchParams(searchParams.toString());

      const manipulatedParams = params
        .map(({ id, value }) => {
          if (typeof value === 'number') {
            value = value.toString();
          }
          if (value) {
            newParams.set(id, value);
            return `${id}=${value}`;
          } else {
            newParams.delete(id);
            return;
          }
        })
        .filter(Boolean);

      const manipulatedParamsString = manipulatedParams.join('&');
      setQueryParams(params);
      setQueryString(manipulatedParamsString);
      if (push) window.history.pushState({}, '', pathname + '?' + manipulatedParamsString);
      return manipulatedParamsString;
    },
    [searchParams, pathname],
  );

  return { query, queryParams, setQuery };
}

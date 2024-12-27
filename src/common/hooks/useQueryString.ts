'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

export type TQueryParams = {
  id: string;
  value: string | number | undefined;
};

export function useQueryString() {
  const searchParams = useSearchParams();

  const setQuery = useCallback(
    (params: TQueryParams[]) => {
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
      window.history.pushState({}, '', '?' + manipulatedParamsString);
      return manipulatedParamsString;
    },
    [searchParams],
  );

  return { setQuery };
}

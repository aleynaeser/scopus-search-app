'use client';

import { useQueryString } from '@common/hooks';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { ISCTable } from './src/interface/table.interface';
import {
  getCoreRowModel,
  PaginationState,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { LayoutCard } from '@components/Layout';
import classNames from 'classnames';
import TableHead from './src/components/TableHead';
import TableBody from './src/components/TableBody';
import useTableColumns from './src/helpers/useTableColumns';
import TablePagination from './src/components/TablePagination';
import TableEmptyContent from './src/components/TableEmptyContent';

import './src/sass/sc-table.scss';

export const TABLE_PER_PAGE = 25;

export default function SCTable<TData>({
  id,
  tableKey,
  initialData,
  state,
  className,
  searchParams,
  SearchComponent,
  columns: columnItems,
  renderer,
  ...tableProps
}: ISCTable<TData>) {
  const isFirstRender = useRef(true);
  const columns = useTableColumns(columnItems);

  const { setQuery } = useQueryString();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: TABLE_PER_PAGE,
    pageIndex: searchParams.start ? Number(searchParams.start) : 0,
  });

  const { data: queryResponse, isLoading } = useQuery<TServiceListResponse<TData>>({
    queryKey: [tableKey, pagination.pageIndex, pagination.pageSize, columnFilters],
    initialData: isFirstRender.current ? initialData : undefined,
    enabled: !(isFirstRender.current && initialData),
    queryFn: async () => {
      const flattenedFilters: { [key: string]: any } = {};
      columnFilters.forEach((filter) => (flattenedFilters[`${filter.id}`] = filter.value));

      const start = (pagination.pageIndex * pagination.pageSize).toString();
      const query = flattenedFilters?.query ?? searchParams?.query;
      const subj = flattenedFilters?.subject ?? searchParams?.subj;

      console.log(start, query, subj, 'start, query, subj');

      const result = await renderer({ start, query, subj });

      setQuery(
        [
          { id: 'start', value: start },
          { id: 'query', value: query },
          { id: 'subject', value: subj },
        ],
        true,
      );

      return result;
    },
  });

  const data = useMemo(() => {
    return (
      queryResponse?.['search-results'] ?? {
        entry: [],
        'opensearch:itemsPerPage': TABLE_PER_PAGE,
        'opensearch:Query': searchParams.query,
        'opensearch:totalResults': '0',
        'opensearch:startIndex': '0',
      }
    );
  }, [queryResponse]);

  const totalResults = Number(data['opensearch:totalResults']);

  const table = useReactTable({
    ...tableProps,
    columns,
    data: data.entry ?? [],
    rowCount: totalResults ?? 0,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    manualPagination: true,
    manualFiltering: true,
    state: { pagination, columnFilters, ...state },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: (updater) => {
      setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
      setColumnFilters(updater);
    },
  });

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <Fragment>
      <SearchComponent table={table} searchParams={searchParams} />

      <LayoutCard
        id={id}
        className={classNames(`sc-table-container`, {
          [className!]: className,
          empty: totalResults <= 0,
          loading: isLoading,
        })}
      >
        <div className='sc-table-wrapper'>
          <table className='sc-table'>
            <TableHead<TData> table={table} />
            <TableBody<TData> table={table} isLoading={isLoading} />
          </table>
        </div>

        {totalResults <= 0 && <TableEmptyContent content='There is no data yet.' />}
        {totalResults > 0 && <TablePagination table={table} />}
      </LayoutCard>
    </Fragment>
  );
}

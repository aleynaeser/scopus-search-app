import { Row, RowData, Table, TableOptions } from '@tanstack/react-table';

export type TSearchComponent<TData> = {
  table: Table<TData>;
  searchParams: TServiceSearchParams;
};

export interface ISCTable<TData extends RowData> extends Omit<TableOptions<TData>, 'getCoreRowModel' | 'data'> {
  id: string;
  tableKey: string;
  className?: string;
  searchParams: TServiceSearchParams;
  initialData?: TServiceListResponse<TData>;
  SearchComponent: React.FC<TSearchComponent<TData>>;
  renderer: (params: TServiceSearchParams) => Promise<TServiceListResponse<TData>>;
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    rowClassName?: ((row: Row<TData>) => string) | string;
    headClassName?: string;
    formatter?: string;
    width?: string;
  }
}

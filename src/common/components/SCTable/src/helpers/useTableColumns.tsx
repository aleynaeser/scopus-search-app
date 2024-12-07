import { useCallback, useMemo } from 'react';
import { CellContext } from '@tanstack/react-table';
import { ISCTable } from '../interface/table.interface';

export default function useTableColumns<TData>(columnItems: ISCTable<TData>['columns']) {
  const formatCell = useCallback((formatter: string, info: CellContext<TData, any>) => {
    switch (formatter) {
      case 'date':
        const date = info.getValue();
        return new Date(date).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
    }
  }, []);

  const columns = useMemo(() => {
    return columnItems.map((column) => {
      if (column.meta?.formatter) {
        return {
          ...column,
          cell: (info: CellContext<TData, any>) => formatCell(column.meta!.formatter!, info),
        };
      }
      return column;
    });
  }, [columnItems, formatCell]);

  return columns;
}

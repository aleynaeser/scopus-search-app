import { Table, flexRender } from '@tanstack/react-table';
import classNames from 'classnames';

interface ITableBody<TData> {
  table: Table<TData>;
}

export default function TableBody<TData>({ table }: ITableBody<TData>) {
  const rowModel = table.getRowModel();

  return (
    <tbody className='sc-table-tbody'>
      {rowModel.rows.map((row) => (
        <tr key={row.id} className='table-row'>
          {row.getVisibleCells().map((cell) => {
            const isCellContextExist = Array.isArray(cell.getContext().getValue())
              ? (cell.getContext().getValue() as Array<unknown>).length > 0
              : cell.getContext().getValue();

            const isCellIdStartWithUnderscore =
              cell.column.id.startsWith('_') || cell.column.accessorFn?.(cell.row.original, cell.column.getIndex());

            const isCellEmpty = !isCellIdStartWithUnderscore && !isCellContextExist;

            return (
              <td
                key={cell.id}
                className={classNames('row-data', {
                  'action-row-data': cell.column.id === '_actions',
                })}
              >
                {isCellEmpty ? (
                  <div className='empty-cell'></div>
                ) : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

import { Table } from '@tanstack/react-table';
import classNames from 'classnames';
import SCIcon from '@components/SCIcon';
import { TABLE_PER_PAGE } from '@components/SCTable';

interface ITablePagination<TData> {
  table: Table<TData>;
}

export default function TablePagination<TData>({ table }: ITablePagination<TData>) {
  const totalCount = table.getRowCount();
  const pagination = table.getState().pagination;

  const pageSize = Number(pagination.pageSize) ?? TABLE_PER_PAGE;
  const pageIndex = Number(pagination.pageIndex);

  return (
    <div className='table-pagination'>
      <div className='pagination-info'>
        Showing {pageIndex * pageSize + 1} - {pageIndex * pageSize + pageSize} of {totalCount} rows
      </div>

      {pageSize && (
        <div className='pagination-buttons'>
          <button
            type='button'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={classNames('pagination-button prev', { active: table.getCanPreviousPage() })}
          >
            <SCIcon icon='sc-chevron-left' color='11' size='22' />
          </button>

          <button
            type='button'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={classNames('pagination-button next', { active: table.getCanNextPage() })}
          >
            <SCIcon icon='sc-chevron-right' color='3' size='22' />
          </button>
        </div>
      )}
    </div>
  );
}

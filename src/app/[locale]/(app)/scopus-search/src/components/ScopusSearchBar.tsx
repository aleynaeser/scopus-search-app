'use client';

import { useMemo } from 'react';
import { Form, Formik } from 'formik';
import { LayoutCard } from '@components/Layout';
import { SelectInput } from '@components/Inputs';
import { subjectOptions } from '@common/constants';
import { IScopusSearchEntry } from '../interfaces';
import { useMutation } from '@tanstack/react-query';
import { TSearchComponent } from '@components/SCTable/src/interface/table.interface';
import SCSearch from '@components/Inputs/SCSearch';

export default function ScopusSearchBar({ table }: TSearchComponent<IScopusSearchEntry>) {
  const columnFilters = table.getState().columnFilters;

  const { mutateAsync, reset } = useMutation({
    gcTime: 0,
    mutationKey: ['apply-product-table-filter'],
    mutationFn: async (values: typeof initialValues) => {
      const queryParams = [
        { id: 'query', value: values.query },
        { id: 'subject', value: values.subject?.key },
      ];

      table.setColumnFilters(queryParams);
      return columnFilters;
    },
    onSettled: () => setTimeout(() => reset(), 1000),
  });

  const initialValues = useMemo(
    () => ({
      query: columnFilters.find((filter) => filter.id === 'query')?.value as string | undefined,
      subject:
        subjectOptions.find((option) => option.id === columnFilters.find((filter) => filter.id === 'subject')?.value) ??
        undefined,
    }),
    [columnFilters],
  );
  return (
    <LayoutCard id='scopus-search-bar' containerTag='section'>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const data = await mutateAsync(values);
          data && formikHelpers.resetForm();
        }}
        enableReinitialize
      >
        {({ values, setFieldValue, resetForm }) => {
          return (
            <Form className='scopus-search-form'>
              <SCSearch
                placeholder='Search in scopus...'
                onKeyDown={async (value) => {
                  await mutateAsync(values);
                }}
                onChange={(value, isKeydown) => {
                  setFieldValue('query', value);

                  if (value.length === 0 && isKeydown) {
                    resetForm();
                    table.resetColumnFilters();
                  }
                }}
              />

              <SelectInput<(typeof subjectOptions)[number]>
                name='subject'
                className='subject-select'
                options={subjectOptions}
              />
            </Form>
          );
        }}
      </Formik>
    </LayoutCard>
  );
}

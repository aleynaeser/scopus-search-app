import { useEffect } from 'react';
import { getIn, useFormikContext } from 'formik';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';
import classNames from 'classnames';
import Select from 'react-select';

import './select-input.scss';

type TWithId<T> = T & { id: string; name: string; key: string };

interface ISelectInput<T> extends Omit<StateManagerProps<TWithId<T>>, 'options'> {
  name: string;
  options: TWithId<T>[];
  className?: string;
}

export default function SelectInput<T>({ name, options, className, ...selectProps }: ISelectInput<T>) {
  const { values, errors, touched, isValidating, isSubmitting, setFieldValue, setFieldTouched } = useFormikContext<{
    [key: string]: TWithId<T>;
  }>();

  const value = selectProps.defaultValue ?? getIn(values, name);
  const hasError = getIn(errors, `${name}.name`) && getIn(touched, `${name}.name`);

  useEffect(() => {
    isSubmitting && isValidating && setFieldTouched(`${name}.name`, true);
  }, [isValidating, isSubmitting]);

  return (
    <Select
      name={name}
      key={`select-key-${value}`}
      classNamePrefix='custom-select'
      className={classNames('select-input', { [className!]: className, hasError })}
      value={value}
      options={options}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => `${option.key} (${option.name})`}
      onChange={(selected) => setFieldValue(name, selected)}
      onBlur={(event) => {
        setFieldTouched(name, true);
        setFieldTouched(`${name}.name`, true);
        selectProps.onBlur?.(event);
      }}
      {...selectProps}
    />
  );
}

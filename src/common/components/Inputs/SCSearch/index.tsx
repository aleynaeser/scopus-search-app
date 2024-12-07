import { useRef, useState } from 'react';
import classNames from 'classnames';

import './sc-search.scss';

interface ISCSearch {
  placeholder: string;
  defaultValue?: string;
  onKeyDown?: (event: string) => void;
  onChange: (event: string, isKeydown?: boolean) => void;
}

export default function SCSearch({ placeholder, defaultValue, onKeyDown, onChange }: ISCSearch) {
  const searchRef = useRef<HTMLInputElement>(null);

  const [isSearching, setIsSearcing] = useState<boolean>(false);
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);

  return (
    <div className='sc-search'>
      <input
        id='sc-search'
        ref={searchRef}
        type='text'
        className='search-input form-input'
        placeholder={placeholder}
        defaultValue={defaultValue}
        onClick={() => setIsSearcing(true)}
        onChange={(event) => {
          setIsSearcing(true);
          onChange(event.target.value, isKeyDown);
          if (event.currentTarget.value.length === 0) setIsKeyDown(false);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.currentTarget.value.length > 0) {
            setIsKeyDown(true);
            onKeyDown && onKeyDown(event.currentTarget.value);
          }

          if (event.key === 'Escape') {
            setIsSearcing(false);
            event.currentTarget.blur();
          }
        }}
      />

      <button
        type='button'
        className={classNames('search-button', { close: isSearching })}
        onClick={() => {
          if (isSearching && searchRef.current) {
            if (searchRef.current.value.length > 0) {
              searchRef.current.value = '';

              if (isKeyDown) {
                onChange('', isKeyDown);
                setIsKeyDown(false);
              }

              onChange('');
              searchRef.current?.focus();
            } else {
              setIsSearcing(false);
            }
          } else {
            searchRef.current?.focus();
            setIsSearcing(true);
          }
        }}
      ></button>
    </div>
  );
}

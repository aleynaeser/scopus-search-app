'use client';

import { SCTitle } from '..';
import SCIcon from '@components/SCIcon';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import './sc-toolbar.scss';

interface SCToolbar {
  title: string;
  printComponentRef: React.RefObject<HTMLDivElement>;
}

export default function SCToolbar({ title, printComponentRef }: SCToolbar) {
  return (
    <div className='sc-toolbar'>
      <SCTitle title={title} />

      <ReactToPrint content={() => printComponentRef.current} removeAfterPrint>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <button type='button' className='toolbar-print-button' onClick={handlePrint}>
              <SCIcon icon='sc-arrow-down' size='14' />
              Print
            </button>
          )}
        </PrintContextConsumer>
      </ReactToPrint>
    </div>
  );
}

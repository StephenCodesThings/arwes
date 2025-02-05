```tsx
// Change the browser viewport width to test.

import React, { ReactElement, Fragment } from 'react';
import { render } from 'react-dom';
import { Global } from '@emotion/react';
import { createThemeBreakpoints } from '@arwes/theme';

const bps = createThemeBreakpoints([
  { key: 'small', value: '400px' },
  { key: 'medium', value: '800px' },
  { key: 'large', value: '1200px' }
]);

const Sandbox = (): ReactElement => {
  return (
    <Fragment>
      <Global
        styles={{
          '.box': {
            margin: 20,
            width: 150,
            height: 150,
            backgroundColor: 'cyan',

            [bps.up('small')]: {
              backgroundColor: 'magenta'
            },
            [bps.up('medium')]: {
              backgroundColor: 'yellow'
            },
            [bps.up('large')]: {
              backgroundColor: 'green'
            },

            [bps.down('medium')]: {
              borderRadius: '30%'
            },

            [bps.between('medium', 'large')]: {
              transform: 'rotate(45deg)'
            }
          }
        }}
      />
      <div className='box' />
    </Fragment>
  );
}

render(<Sandbox />, document.querySelector('#root'));
```

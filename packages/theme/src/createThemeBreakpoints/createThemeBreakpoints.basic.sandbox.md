```tsx
// Change the browser viewport width to test.

import React, { ReactElement, Fragment } from 'react';
import { render } from 'react-dom';
import { Global } from '@emotion/react';
import { createThemeBreakpoints } from '@arwes/theme';

const bps = createThemeBreakpoints();

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

            [bps.up('400px')]: {
              backgroundColor: 'magenta'
            },
            [bps.up('800px')]: {
              backgroundColor: 'yellow'
            },
            [bps.up('1200px')]: {
              backgroundColor: 'green'
            },

            [bps.down('800px')]: {
              borderRadius: '30%'
            },

            [bps.between('800px', '1200px')]: {
              transform: 'skew(-10deg)'
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

```tsx
// Change the browser viewport width to test.

import React, { ReactElement, Fragment } from 'react';
import { render } from 'react-dom';
import { Global } from '@emotion/react';
import { createThemeBreakpoints } from '@arwes/theme';

const bps = createThemeBreakpoints([
  '400px',
  '800px',
  '1200px'
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

            [bps.up(0)]: {
              backgroundColor: 'magenta'
            },
            [bps.up(1)]: {
              backgroundColor: 'yellow'
            },
            [bps.up(2)]: {
              backgroundColor: 'green'
            },

            [bps.down(1)]: {
              borderRadius: '30%'
            },

            [bps.between(1, 2)]: {
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

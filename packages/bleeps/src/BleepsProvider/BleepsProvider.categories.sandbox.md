```tsx
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import {
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepsProvider,
  useBleeps
} from '@arwes/bleeps';

const SOUND_CLICK_URL = '/assets/sounds/click.mp3';
const SOUND_WARNING_URL = '/assets/sounds/warning.mp3';

const InteractClick = ({ children }): ReactElement => {
  const bleeps  = useBleeps();
  const onClick = () => bleeps.tap.play();
  return <button onClick={onClick}>{children}</button>;
};

const NotifyWarn = ({ children }): ReactElement => {
  const bleeps  = useBleeps();
  const onClick = () => bleeps.warn.play();
  return <button onClick={onClick}>{children}</button>;
};

const Sandbox = (): ReactElement => {
  const audioSettings: BleepsAudioSettings = {
    // Default audio settings.
    common: {
      volume: 0.5
    },
    categories: {
      // Interaction bleeps settings.
      interaction: {
        volume: 0.1
      },
      // Notification bleeps settings.
      notification: {
        volume: 1
      }
    }
  };
  const playersSettings: BleepsPlayersSettings = {
    click: {
      src: [SOUND_CLICK_URL]
    },
    warning: {
      src: [SOUND_WARNING_URL]
    }
  };
  const bleepsSettings: BleepsSettings = {
    tap: {
      player: 'click',
      category: 'interaction'
    },
    warn: {
      player: 'warning',
      category: 'notification'
    }
  };

  return (
    <BleepsProvider
      settings={{
        audio: audioSettings,
        players: playersSettings,
        bleeps: bleepsSettings
      }}
    >
      <InteractClick>Interaction Click!</InteractClick>
      {' '}
      <NotifyWarn>Notification Warning!</NotifyWarn>
    </BleepsProvider>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```

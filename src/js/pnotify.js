import { alert, defaults } from '@pnotify/core';

defaults.styling = 'material';
defaults.icons = 'material';

export function notification(
  type = 'error',
  text = 'Oops, something went wrong ',
  delay = 4000,
) {
  const options = {
    type,
    text,
    delay,
  };
  alert(options);
}

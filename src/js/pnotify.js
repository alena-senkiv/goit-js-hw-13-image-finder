import { alert } from '@pnotify/core';

export function notification(
  type = 'error',
  text = 'Oops, something went wrong ',
  title = '',
  delay = 2000,
) {
  const options = {
    type,
    title,
    text,
    delay,
  };
  alert(options);
}

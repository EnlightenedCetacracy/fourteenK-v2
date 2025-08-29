import { signal } from '@preact/signals';

export const state = {
  tickboxes: signal({}),   // { [id]: boolean }
  inputs: signal({}),      // { [id]: string }
  tooltip: signal(null),   // string|null 
};
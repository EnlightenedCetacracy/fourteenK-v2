import { h } from 'preact';
import { store } from '../store';
import { state } from '../state';

export function Tickbox({ id }) {
  const checked = !!state.tickboxes.value[id];
  return (
    <input
      type="checkbox"
      checked={checked}
      onInput={e => store.setTickbox(id, e.target.checked)}
    />
  );
}

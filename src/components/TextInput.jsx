import { h } from 'preact';
import { store } from '../store';
import { state } from '../state';

export function TextInput({ id, size }) {
  return (
    <textarea
      value={state.inputs.value[id] || ''}
      onInput={e => store.setInput(id, e.target.value)}
      {...(size ? { size } : {})} 
      style={{ resize: 'both' }} 
    />
  );
}
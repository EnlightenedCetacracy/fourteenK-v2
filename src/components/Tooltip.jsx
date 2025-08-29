
import { h } from 'preact';
import { store } from '../store';
import { state } from '../state';
export function Tooltip({ id, content }) {
    return state.tooltip === id && (
      <div class="tooltip">
        {content}
        <button onClick={() => store.setTooltip(null)}>×</button>
      </div>
    );
  }
  
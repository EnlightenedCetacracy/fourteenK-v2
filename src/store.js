import { state } from './state';

export const store = {
  state,

  setTickbox(id, value) {
    state.tickboxes.value = { ...state.tickboxes.value, [id]: value };
    // NB No need to notify, signals handle reactivity
  },

  setInput(id, value) {
    state.inputs.value = { ...state.inputs.value, [id]: value };
  },

  showTooltip(id) {
    state.tooltip.value = id;
  },

  hideTooltip() {
    state.tooltip.value = null;
  }
};

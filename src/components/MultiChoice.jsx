import { h } from "preact"; import { store } from "../store"; import { state } from "../state";

export function MultiChoice({ id: groupId, options, maxOne = true, allowEmpty = true }) {

const handleInput = (optionId) => { const currentSelections = state.multiChoices.value[groupId] || []; const isCurrentlyChecked = currentSelections.includes(optionId);

if (maxOne) {
  if (isCurrentlyChecked) {
    if (allowEmpty) {
      store.clearMultiChoices(groupId);
    }
  } else {
    store.setMultiChoices(groupId, optionId);
  }
} else {
  store.toggleMultiChoices(groupId, optionId);
}

};

const currentSelections = state.multiChoices.value[groupId] || [];

return (
  <div class="multi-choice-line">
    {options.map(option => { 
      const optionId = option.replace(/\s+/g, "-").toLowerCase(); 
      const isChecked = currentSelections.includes(optionId);

        return (
          <div class="multi-choice-option" key={optionId}>
            <label for={groupId + "-" + optionId}>{option}</label>
            <input
              type="checkbox"
              id={groupId + "-" + optionId}
              name={groupId}
              checked={isChecked}
              onInput={() => handleInput(optionId)}
            />
          </div>
        );
      })}
  </div>
); }

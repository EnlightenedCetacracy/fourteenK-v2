import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { Tickbox, TextInput, MultiChoice, Tooltip, Section } from './components';
import { store } from './store';
import { state } from './state';


import preactLogo from './assets/preact.svg';
import './style.css';

export function App() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      ...state.inputs.value,
      ...state.tickboxes.value,
      ...state.multiChoices.value,
    };

    console.log('Submitting form data:', formData);

    fetch('/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // You could show a success message to the user here
    })
    .catch((error) => {
      console.error('Error:', error);
      // You could show an error message to the user here
    });
  };

	return (
		<div class="app">
			<h1>A form::: </h1>

      <form class="main-form" onSubmit={handleSubmit}>
        <div class="section-group">
          <h2>General</h2>
          <Section id="basic-section">
            <Tickbox id="notifications" />
            <TextInput id="username" />
          </Section>
        </div>

        <div class="section-group">
          <h2>Advanced</h2>
          <Section id="advanced-section">
            <TextInput id="api-key" />
            <Tooltip id="key-help" content="Paste your API token here" />
          </Section>
        </div>

        <div class="section-group">
          <h2>Choose Your Poison</h2>
          <Section id="multichoice">
            <MultiChoice id="multichoice" options={["bag", "of", "arse"]}/>
            <Tooltip id="key-help" content="Paste your API token here" />
          </Section>
        </div>

        <div class="submit-container">
          <button type="submit" class="submit-button">Save Changes</button>
        </div>
      </form>
		</div>
	);
}


render(<App />, document.getElementById('app'))
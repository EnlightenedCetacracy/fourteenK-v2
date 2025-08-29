import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { Tickbox, TextInput, Tooltip, Section } from './components';
import { store } from './store';
import { state } from './state';


import preactLogo from './assets/preact.svg';
import './style.css';

export function App() {
  // Force re-renders on store change
  const [_, setVersion] = useState(0);
  
  useEffect(() => {
    const forceUpdate = () => setVersion(v => v + 1);
    document.addEventListener('state-change', forceUpdate);
    return () => document.removeEventListener('state-change', forceUpdate);
  }, []);

	return (
		<div class="app">
			<h1>A form::: </h1>
      <Section id="basic-section">
        <Tickbox id="notifications" />
        <TextInput id="username" />
      </Section>

      <Section id="advanced-section">
        <TextInput id="api-key" />
        <Tooltip id="key-help" content="Paste your API token here" />
      </Section>
		</div>
	);
}


render(<App />, document.getElementById('app'));

// --- START OF SCRIPT ---
const fs = require('fs');
const path = require('path');

const fileContents = {
  'src/components/Section.jsx': `import { h } from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';
import { state } from '../state';

/**
 * Section component
 * @param {Object} props
 * @param {string} props.id - Section ID
 * @param {Function} props.shouldShow - Function: (state) => boolean
 * @param {'invisible'|'placeholder'} [props.placeholderMode='invisible']
 * @param {preact.ComponentChildren} props.children
 */
export function Section({ id, shouldShow = () => true, placeholderMode = 'invisible', children }) {
  const visible = shouldShow(state);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Remove previous transition to measure height instantly
    el.style.transition = 'none';
    el.style.height = visible ? 'auto' : '0px';
    // Force browser to apply the height immediately
    void el.offsetHeight;

    // Now set up the transition for next change
    el.style.transition = 'height 0.18s';

    if (visible) {
      // Expand: measure the full height, then animate to it
      el.style.height = '0px';
      void el.offsetHeight; // force reflow
      el.style.height = el.scrollHeight + 'px';
    } else {
      // Collapse: animate to 0
      el.style.height = el.scrollHeight + 'px';
      void el.offsetHeight; // force reflow
      el.style.height = '0px';
    }
  }, [visible]);

  // When fully hidden and not in placeholder mode, don't render children at all
  const shouldRenderChildren = visible || placeholderMode === 'placeholder';

  return (
    <section
      id={id}
      ref={sectionRef}
      className={\`section\\\${visible ? ' section--visible' : ' section--hidden'}\\`}
      style={{
        overflow: 'hidden',
        height: visible ? 'auto' : '0px',
        transition: 'height 0.18s',
      }}
    >
      {shouldRenderChildren
        ? visible
          ? children
          : (
            <div className="section__placeholder">
              <hr style={{ margin: '0.5em 0' }}/>
              <small style={{ color: '#888' }}>Section hidden</small>
              <hr style={{ margin: '0.5em 0' }}/>
            </div>
          )
        : null}
    </section>
  );
}`,
  'src/index.jsx': `import { render } from 'preact';
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
		</div>
	);
}


render(<App />, document.getElementById('app'));`,
  'src/style.css': `/* 1. Global Styles & Color Palette */
:root {
  --primary-color: #0B43B1;
  --secondary-color: #DEB92F;
  --background-color: #f0f2f5;
  --text-color: #333;
  --border-color: #d9d9d9;
  --card-background: #ffffff;
  --header-background: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #1a1a1a;
    --text-color: #e0e0e0;
    --border-color: #444;
    --card-background: #2a2a2a;
    --header-background: #222;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

/* 2. Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--background-color);
}
::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 4px;
  border: 2px solid var(--background-color);
}
::-webkit-scrollbar-thumb:hover {
  background-color: #08338a; /* A slightly darker shade for hover */
}

/* 3. Layout & App container */
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  color: var(--primary-color);
  text-align: center;
  border-bottom: 2px solid var(--secondary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
}

/* 4. Section Grouping & Delineation */
.section-group {
  background-color: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.section-group h2 {
  font-size: 1.2rem;
  padding: 1rem 1.5rem;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--primary-color);
}

/* 5. Section styling */
.section {
  padding: 1.5rem;
  /* The height transition is handled by inline styles from the component */
}

.section:not(:last-child) {
    border-bottom: 1px dashed var(--border-color);
}

/* 6. Form Element Styling */
textarea,
input[type="checkbox"] {
  margin-top: 0.5rem;
}

textarea {
  width: calc(100% - 20px); /* Account for padding */
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 50px;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(11, 67, 177, 0.2);
}

/* 7. Responsive Design */
@media (max-width: 600px) {
  .app {
    padding: 0.5rem;
  }
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .section-group h2 {
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
  }
  .section {
    padding: 1rem;
  }
}`
};

try {
  console.log('Applying file changes...');
  for (const [filePath, content] of Object.entries(fileContents)) {
    const fullPath = path.resolve(process.cwd(), filePath);
    // Ensure directory exists
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`- Successfully wrote changes to ${filePath}`);
  }
  console.log('All changes applied successfully!');
} catch (error) {
  console.error('An error occurred while applying changes:', error);
  process.exit(1);
}
// --- END OF SCRIPT ---
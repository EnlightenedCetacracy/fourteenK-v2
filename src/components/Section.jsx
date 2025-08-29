import { h } from 'preact';
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
export function Section({ id, shouldShow, placeholderMode = 'invisible', children }) {
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
      className={`section${visible ? ' section--visible' : ' section--hidden'}`}
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
}

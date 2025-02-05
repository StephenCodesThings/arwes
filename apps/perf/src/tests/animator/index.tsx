import React, { ReactElement, Profiler, Fragment, useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';

import { AnimatorGeneralProvider, Animator, useAnimator } from '@arwes/animator';

const TEST_RENDER_NUMBER = 3000;

const TEST_ON_RENDER = (id: string, phase: string, duration: number): void => {
  if (phase === 'mount') {
    console.log(`mount: ${duration} ms`);
  }
};

const Item = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator();

  useEffect(() => {
    animator?.node.subscribers.add(node => {
      const element = elementRef.current as HTMLDivElement;

      switch (node.getState()) {
        case 'exited': element.style.opacity = '0.05'; break;
        case 'entering': element.style.opacity = '0.5'; break;
        case 'exiting': element.style.opacity = '0.5'; break;
        case 'entered': element.style.opacity = '1'; break;
      }
    });
  }, []);

  return <div ref={elementRef} className='item' />;
};

const Test = (): ReactElement => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), 2000);
    return () => clearTimeout(tid);
  }, [active]);

  return (
    <Fragment>
      <p>Root animator state: <b>{active ? 'active' : 'deactivated'}</b></p>
      <AnimatorGeneralProvider duration={{ enter: 0.5, exit: 0.5 }}>
        <Animator active={active} combine>
          {Array(TEST_RENDER_NUMBER).fill(null).map((_, index) =>
            <Animator
              key={index}
              onTransition={node => {
                const state = node.getState();
                if (index === 0) {
                  console.time(state);
                }
                else if (index + 1 === TEST_RENDER_NUMBER) {
                  console.timeEnd(state);
                }
              }}
            >
              <Item />
            </Animator>
          )}
        </Animator>
      </AnimatorGeneralProvider>
    </Fragment>
  );
};

const App = (): ReactElement => {
  return (
    <Profiler id='test' onRender={TEST_ON_RENDER}>
      <Test />
    </Profiler>
  );
};

render(<App />, document.querySelector('#root'));

import { Provider } from '@expressive/mvc';
import React from 'react';
import { CSSProperties, FC, ReactNode } from 'react';

import Virtual from './Virtual';

declare namespace Window {
  interface Item {
    index: number;
    key: number;
    offset: number;
    size: number;
  }

  interface Props {
    for: {
      use(): Virtual
    };
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    component: FC<Item>;
  }
}

function Window(props: Window.Props){
  const { get: control, container, slice, DOM, size } = props.for.use();

  return (
    <Provider of={control}>
      <div
        ref={container}
        className={props.className}
        style={{ ...props.style, overflowY: "auto" }}
      >
        {props.children}
        <div style={{
          position: "relative",
          [DOM.sizeX]: size
        }}>
          {slice.map((p) => <props.component {...p} />)}
        </div>
      </div>
    </Provider>
  )
}

export default Window;
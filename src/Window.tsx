import React from "react";

import { Provider } from '@expressive/mvc';
import { CSSProperties, FC, ReactNode, useMemo } from 'react';

import Virtual from './Virtual';

export interface Item {
  index: number;
  key: number;
  offset: number;
  size: number;
}

type RenderFunction =
  (info: Item, index: number) => ReactNode;

namespace Window {
  interface ContainerProps {
    for: { use(): Virtual };
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
  }

  export type Props =
    | (ContainerProps & { component: FC<Item> })
    | (ContainerProps & { render: RenderFunction })
}

function Visible(props: { render: RenderFunction }){
  const { size, slice, range, DOM } = Virtual.tap();

  console.log(`Render Visible:`)
  console.log(`Size is now ${size}`)
  console.log(`Render range ${range[0]} - ${range[1]}`)
  console.log(`Render slice of ${slice.length} length`)

  return (
    <div style={{ position: "relative", [DOM.sizeX]: size }}>
      {slice.map(props.render)}
    </div>
  )
}

function Window(props: Window.Props){
  const { get: control, container } = props.for.use();

  const renderRow = useMemo(() => (
    "component" in props
      ? (p: any) => <props.component context={control} {...p} />
      : props.render
  ), []);

  return (
    <Provider of={control}>
      <div
        ref={container}
        className={props.className}
        style={{ ...props.style, overflowY: "scroll" }}
      >
        {props.children}
        <Visible render={renderRow} />
      </div>
    </Provider>
  )
}

export default Window;
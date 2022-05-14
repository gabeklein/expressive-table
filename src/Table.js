import Model, { Provider, ref, useModel } from '@expressive/mvc';
import { useLayoutEffect } from 'react';

import * as components from './components';
import Grid from './Grid';
import Header from './Header';
import Rows from './Rows';
import Virtual from './Virtual';

export const Table = (props) => {
  const control = useModel(() => {
    const source = props.for;

    if(!source)
      return new Grid();

    if(source instanceof Grid)
      return source;

    if(Grid.isTypeof(source))
      return new source();

    throw new Error("Table expects either an instance or typeof Grid.");
  }, []);

  useLayoutEffect(() => {
    control.ready = true;
  }, []);

  control.import(props);

  <Provider of={control}>
    <Body {...props} />
  </Provider>
}

Object.assign(Table, components);

export default Table;

const Body = (props) => {
  const {
    style,
    length,
    didEnd,
    padding
  } = Grid.tap();

  const {
    container,
    size,
    areaX,
    get: virtual
  } = Virtual.using({ length, didEnd });

  const marginOffset = size > areaX ? padding : 0;

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{ ...props.style, ...style }}>
    <Header {...props} padding={marginOffset} />
    <Provider of={virtual}>
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
        {props.after}
        {props.children}
      </div>
    </Provider>
  </this>
}
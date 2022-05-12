import Model, { Provider, ref, useModel } from '@expressive/mvc';
import { useLayoutEffect } from 'react';

import Grid from './Grid';
import Header from './Header';
import Rows from './Rows';

export const Table = (props) => {
  const Empty = props.empty;
  const {
    style,
    get: control,
    virtual: {
      container,
      size
    }
  } = useModel(() => {
    const source = props.for;

    if(!source)
      return new Grid();

    if(source instanceof Grid)
      return source;

    if(Grid.isTypeof(source))
      return new source();

    throw new Error("Table expects either instance or typeof Grid.")
  });

  control.import(props);

  useLayoutEffect(() => {
    control.ready = true;
  }, []);

  container: {
    style = { ...props.style, ...style };
    forward: className;
    gridRows: min, "minmax(0, 1.0fr)";
    overflow: hidden;
  }

  <Provider of={control}>
    <container>
      <Header {...props} />
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
        {props.after}
        {props.children}
      </div>
    </container>
  </Provider>
}

export default Table;
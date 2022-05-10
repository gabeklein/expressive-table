import Model, { Provider, ref } from '@expressive/mvc';
import { useLayoutEffect } from 'react';

import Grid from './Grid';
import Header from './Header';
import Rows from './Rows';

export const Table = (props) => {
  const Control = props.for || Grid;
  const Empty = props.empty;
  const {
    style,
    length,
    get: control,
    virtual: {
      container,
      size
    }
  } = Control.use();

  control.import(props);

  container: {
    forward: className;
    gridRows: min, "minmax(0, 1.0fr)";
    overflow: hidden;

    style = {
      ...props.style,
      ...style
    };
  }

  <Provider of={control}>
    <container>
      <Header {...props} />
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
        {!length && !!Empty && (
          typeof Empty == "function"
            ? <Empty context={control} />
            : Empty
        )}
        {props.after}
        {props.children}
      </div>
    </container>
  </Provider>
}

export const Column = (props) => {
  const control = Grid.get();

  useLayoutEffect(() => {
    control.register(props);
  }, []);

  return false;
}
import Model, { Provider, ref } from '@expressive/mvc';
import { useMemo } from 'react';

import Grid from './Grid';
import Header from './Header';
import Rows from './Rows';
import Virtual from './Virtual';

const VirtualBody = (props) => {
  const {
    rows,
    style,
    length,
    didEnd,
    padding,
    calibrate
  } = Grid.tap();

  const {
    container,
    size,
    areaX,
    get: virtual
  } = Virtual.use();

  const marginOffset = size > areaX ? padding : 0;

  useMemo(() => {
    virtual.didEnd = didEnd;
    virtual.length = rows ? rows.length : length;
    virtual.update("length");
  }, [length, rows, didEnd]);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  sensor: {
    overflowY: scroll;
  }

  <this style={{ ...props.style, ...style }}>
    <Header {...props} padding={marginOffset} />
    <Provider of={virtual}>
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
        {props.after}
      </div>
    </Provider>
    <sensor ref={calibrate} />
  </this>
}

export default VirtualBody;
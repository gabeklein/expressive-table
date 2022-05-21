import Model, { Provider } from '@expressive/mvc';
import { useCallback, useMemo, useState } from 'react';

import Grid from './Grid';
import Header from './Header';
import Rows from './Rows';
import Virtual from './Virtual';

const VirtualBody = (props) => {
  const { rows, style, length, didEnd } = Grid.tap();
  const { get: virtual, container, size, areaX } = Virtual.use();

  const [padding, setPadding] = useState();
  const marginOffset = size > areaX ? padding : 0;
  const calibrate = useCallback(event => {
    if(event)
      setPadding(
        event.parentElement.scrollWidth -
        event.scrollWidth
      );
  })

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
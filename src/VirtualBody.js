import Model, { Provider } from '@expressive/mvc';
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
    didEnd
  } = Grid.tap();

  const {
    get: virtual,
    container,
    size,
    areaX
  } = Virtual.use();

  useMemo(() => {
    virtual.didEnd = didEnd;
    virtual.length = rows ? rows.length : length;
    virtual.update("length");
  }, [length, rows, didEnd]);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{ ...props.style, ...style }}>
    <Header {...props} scrollY={size > areaX} />
    <Provider of={virtual}>
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
        {props.after}
      </div>
    </Provider>
  </this>
}

export default VirtualBody;
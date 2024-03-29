import Model, { Provider } from '@expressive/react';
import { useLayoutEffect, useMemo, useState } from 'react';

import { Grid } from '../Grid';
import { Header } from '../Header';
import { useGap, usePadding } from '../hooks';
import { Rows } from './Rows';
import { Virtual } from './Virtual';

const Body = (props) => {
  const {
    rows,
    template,
    length,
    didEnd
  } = Grid.get();

  const {
    is: virtual,
    container,
    size
  } = Virtual.use();

  const gridGap = useGap(props.gap);
  const padding = usePadding(props.children, container);

  useMemo(() => {
    virtual.didEnd = didEnd;
    virtual.length = rows ? rows.length : length;
    virtual.set("length");
  }, [length, rows, didEnd]);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{
    "--table-row-columns": template,
    "--table-grid-gap": gridGap,
    ...props.style
  }}>
    <Provider for={virtual}>
      <Header {...props} padding={padding} />
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

export { Body };
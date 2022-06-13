import { Children, useLayoutEffect, useMemo, useRef, useState } from 'react';

import Header from './Header';
import { useGap, usePadding } from './hooks';

const Body = (props) => {
  const container = useRef(null);
  const offset = usePadding(props.children, container);
  const gridGap = useGap(props.gap);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{
    "--table-row-columns": props.template,
    "--table-grid-gap": gridGap,
    ...props.style
  }}>
    <Header {...props} padding={offset} />
    <div ref={container} style={{ overflowY: "auto" }}>
      {props.children}
    </div>
  </this>
}

export { useGap };
export default Body;
import { Provider } from '@expressive/mvc';
import { Suspense, useMemo, useRef } from 'react';

import { Grid } from '../Grid';
import { Header } from '../Header';
import { useGap, usePadding } from '../hooks';
import { Row } from '../Row';
import { uniqueId } from '../util';

const Table = (props) => {
  <this>
    {props.children}
    <Suspense fallback={props.fallback ?? (
      <div className={props.className} />
    )}>
      <Body
        row={DefaultRow}
        header={DefaultHeader}
        {...props}
      />
    </Suspense>
  </this>
}

export { Table };

const Body = (props) => {
  const { template } = Grid.tap();
  const container = useRef(null);
  const offset = usePadding(props.children, container);
  const gridGap = useGap(props.gap);

  container: {
    forward: className;
    gridRows: min, "minmax(0, 1.0fr)";
    overflow: hidden;
  }

  inner: {
    position: relative;
  }

  <container style={{
    "--table-row-columns": template,
    "--table-grid-gap": gridGap,
    ...props.style
  }}>
    <Header {...props} padding={offset} />
    <inner ref={container} style={{ overflowY: "auto" }}>
      <Rows {...props} />
    </inner>
  </container>
}

const Rows = (props) => {
  const { empty: Empty } = props;
  const { rows, length, is: grid } = Grid.tap();

  const entries = useMemo(() => {
    return rows || Array.from({ length }, i => i);
  }, [length, rows]);

  if(length)
    <this>
      {entries.map((row, index) => (
        <Row {...props}
          key={props.refresh ? Math.random() : uniqueId(row)}
          index={index}
          data={row}
        />
      ))}
    </this>
  else if(typeof Empty == "function")
    <Empty context={grid} />
  else
    <this>{Empty || false}</this>
}

const DefaultHeader = ({ children }) => {
  padding: 0, 10;

  <this>
    {children}
  </this>
}

const DefaultRow = ({ children }) => {
  forward: className;
  minHeight: 2.5;
  padding: 0, 10;

  <this>
    {children}
  </this>
}
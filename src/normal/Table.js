import { Provider } from '@expressive/mvc';
import { useMemo, useRef } from 'react';

import Grid, { useGrid } from '../Grid';
import Header from '../Header';
import { useGap, usePadding } from '../hooks';
import Row from '../Row';
import { uniqueId } from '../util';

export const Table = (props) => {
  const control = useGrid(props);

  <Provider for={control}>
    {props.children}
    <Body
      row={DefaultRow}
      header={DefaultHeader}
      {...props}
    />
  </Provider>
}

const Body = (props) => {
  const { rows, template, length } = Grid.tap();
  const container = useRef(null);
  const offset = usePadding(props.children, container);
  const gridGap = useGap(props.gap);

  const entries = useMemo(() => {
    return rows || Array.from({ length }, i => i);
  }, [length, rows]);

  container: {
    forward: className;
    gridRows: min, "minmax(0, 1.0fr)";
    overflow: hidden;
  }

  <container style={{
    "--table-row-columns": template,
    "--table-grid-gap": gridGap,
    ...props.style
  }}>
    <Header {...props} padding={offset} />
    <div ref={container} style={{ overflowY: "auto" }}>
      {entries.map((row, index) => {
        <Row {...props}
          key={props.refresh ? Math.random() : uniqueId(row)}
          index={index}
          data={row}
        />
      })}
    </div>
  </container>
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

export default Table;
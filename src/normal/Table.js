import { Provider } from '@expressive/mvc';
import { useMemo } from 'react';

import GenericBody from '../Body';
import Grid, { useGrid } from '../Grid';
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

  const entries = useMemo(() => {
    return rows || Array.from({ length }, i => i);
  }, [length, rows]);

  <GenericBody {...props} template={template}>
    {entries.map((row, index) => {
      <Row {...props}
        key={props.refresh ? Math.random() : uniqueId(row)}
        index={index}
        data={row}
      />
    })}
  </GenericBody>
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
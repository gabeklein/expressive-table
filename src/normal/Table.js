import { useMemo } from 'react';

import GenericBody from '../Body';
import Core from '../Core';
import Grid from '../Grid';
import Row from '../Row';
import { uniqueId } from '../util';

export const Table = (props) => {
  const { children, ...rest } = props;

  <Core {...rest}>
    {children}
    <Body row={DefaultRow} {...rest} />
  </Core>
}

const Body = (props) => {
  const { rows, template, length } = Grid.tap();

  const entries = useMemo(() => {
    return rows || Array.from({ length }, i => i);
  }, [length, rows]);

  <GenericBody {...props} template={template}>
    {entries.map((row, index) => {
      const key = props.refresh
        ? Math.random()
        : uniqueId(row);

      <Row {...props}
        index={index}
        data={row}
        key={key}
      />
    })}
  </GenericBody>
}

const DefaultRow = ({ children }) => {
  forward: className;
  minHeight: 2.5;

  <this>
    {children}
  </this>
}

export default Table;
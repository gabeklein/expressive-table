import { createElement, memo } from 'react';

import { Grid } from './Grid';
import { Virtual } from './Virtual';

/** @type React.FC<Grid.BodyProps> */
export const Body = ({ style, className }) => {
  const { body, inner, outer } = Virtual.get();

  container: {
    position: 'relative';
    overflowY: 'auto';
  }

  gridRow: {
    display: grid;
    gridTemplateColumns: $tableRowColumns;
    columnGap: $tableGridGap;
  }

  <container ref={outer} style={style} className={className}>
    <inner ref={inner}>
      <Header gridRow />
      <body ref={body}>
        <Rows gridRow />
      </body>
    </inner>
  </container>
}

/** @type React.FC<{ className: string }> */
const Header = ({ className }) => {
  const { columns, Head, Header } = Grid.get();

  <Header className={className}>
    {columns.map(column =>
      createElement(column.Head || Head, { key: column.id, column })
    )}
  </Header>
}

/** @type React.FC<Grid.RowProps> */
const Rows = (props) => {
  const { slice } = Virtual.get();

  return slice.map(data => (
    <Row {...props} key={data.id} data={data} />
  ))
}

/** @type React.FC<Grid.RowProps> */
const Row = memo(({ data, className }) => {
  const { columns, Cell, Row } = Grid.get();

  <Row className={className} key={data.id}>
    {columns.map(column =>
      createElement(column.Cell || Cell, {
        key: column.id,
        className: column.className,
        column,
        data,
      })
    )}
  </Row>
})
import { createElement, memo } from 'react';
import { DefaultCell, DefaultHead, DefaultHeader, DefaultRow } from './components';
import { Grid } from './Control';

/** @type React.FC<Grid.BodyProps> */
export const Body = ({ style, className }) => {
  const { body, inner, outer } = Grid.get();

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
  return Grid.get(({ data, range }) => {
    return data.slice(...range).map(data => 
      createElement(Row, { ...props, key: data.id, data })
    )
  });
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
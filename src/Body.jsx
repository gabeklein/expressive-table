import { createElement, memo } from 'react';
import { DefaultCell, DefaultHead, DefaultHeader, DefaultRow } from './components';
import { ITable } from './Control';

/** @type React.FC<{ style?: React.CSSProperties, className?: string }> */
export const Body = ({ style, className }) => {
  const { body, inner, outer } = ITable.get();

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

const Header = ({ className }) => {
  const {
    columns: hasColumns,
    Head = DefaultHead,
    Header = DefaultHeader
  } = ITable.get();

  <Header className={className}>
    {hasColumns.map(column =>
      createElement(column.Head || Head, { key: column.id, column })
    )}
  </Header>
}

const Rows = (props) => {
  return ITable.get(({ data, range }) => {
    return data.slice(...range).map(data => 
      createElement(Row, { ...props, key: data.id, data })
    )
  });
}

const Row = memo(({ data, className }) => {
  const {
    columns: hasColumns,
    Cell = DefaultCell,
    Row = DefaultRow,
  } = ITable.get();

  <Row className={className} key={data.id}>
    {hasColumns.map(column =>
      createElement(column.Cell || Cell, {
        key: column.id,
        className: column.className,
        column,
        data,
      })
    )}
  </Row>
})
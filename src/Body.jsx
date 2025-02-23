import { createElement } from 'react';
import { DefaultCell, DefaultHead, DefaultHeader, DefaultRow } from './components';
import { ITable } from './Control';

/** @type React.FC<{ style?: React.CSSProperties, className?: string }> */
export const Body = ({
  style,
  className,
}) => {
  const {
    body,
    columns,
    data,
    inner,
    outer,
    range,
    Cell = DefaultCell,
    Head = DefaultHead,
    Header = DefaultHeader,
    Row = DefaultRow,
  } = ITable.get();

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
      <Header gridRow>
        {columns.map(column =>
          createElement(column.Head || Head, { key: column.key, column })
        )}
      </Header>
      <body ref={body}>
        {data.slice(...range).map((data) => {
          <Row gridRow key={data.id}>
            {columns.map(column =>
              createElement(column.Cell || Cell, { key: column.key, column, data })
            )}
          </Row>
        })}
      </body>
    </inner>
  </container>
}
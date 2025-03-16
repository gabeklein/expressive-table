import { memo } from 'react';

import { Grid } from './Grid';

export const Header = (props: { className: string }) => {
  const { columns, Header, Head: Default } = Grid.get();

  return (
    <Header {...props}>
      {columns.map(({ is: column, id, Head = Default }) =>
        <Head key={id} column={column}>
          {column.head()}
        </Head>
      )}
    </Header>
  )
}

export const Rows = (props: { className: string }) => {
  const { rows, key } = Grid.get();

  return rows.map(key).map((i) =>
    <Row {...props} i={i} key={i} />
  );
}

const Row = memo((props: {
  i: number | string;
  className: string;
}) => {
  const { cell: defaultCell, Cell: DefaultCell, columns, row, Row } = Grid.get();
  const data = row(props.i);

  return (
    <Row {...props} data={data}>
      {columns.map(({ Cell = DefaultCell, cell = defaultCell, className, id, is }) =>
        <Cell className={className} column={is} data={data} key={id}>
          {cell(data, is)}
        </Cell>
      )}
    </Row>
  )
})
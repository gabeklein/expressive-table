import { memo } from 'react';

import { Grid } from './Grid';

export const Header = (props: { className: string }) => {
  const { columns, Header, Head: Default } = Grid.get();

  return (
    <Header {...props}>
      {columns.map(({ is: column, id, Head = Default }, i) =>
        <Head key={id} column={column} index={i}>
          {column.head()}
        </Head>
      )}
    </Header>
  )
}

export const Rows = (props: { className: string }) => {
  const { rows, getKey } = Grid.get();

  return rows.map((i) => {
    const k = getKey(i);
    return <Row {...props} key={k} k={k} index={i} />
  });
}

interface RowProps {
  className: string;
  index: number;
  k: number | string;
}

export const Row = memo((props: RowProps) => {
  const { Cell: Default, Row, columns, getData } = Grid.get();
  const data = getData(props.index, props.k);

  return (
    <Row {...props} data={data}>
      {columns.map(({ Cell = Default, className, id, is }, i) =>
        <Cell key={id} className={className} data={data} column={is} index={i}>
          {is.cell(data)}
        </Cell>
      )}
    </Row>
  )
})
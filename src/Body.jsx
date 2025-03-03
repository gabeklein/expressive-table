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
  const { columns, Header, Head: Default } = Grid.get();

  <Header className={className}>
    {columns.map(({ is: column, id, Head = Default }) =>
      <Head key={id} column={column}>
        {column.head()}
      </Head>
    )}
  </Header>
}

/** @type React.FC<Grid.RowProps> */
const Rows = (props) => {
  const { slice } = Virtual.get();

  return slice.map(data =>
    <Row key={data.id} data={data} {...props} />
  )
}

/** @type React.FC<Grid.RowProps> */
const Row = memo(({ data, className }) => {
  const { columns, Row, Cell: Default } = Grid.get();

  <Row className={className} key={data.id}>
    {columns.map(({ Cell = Default, id, className, is: column }) =>
      <Cell key={id} className={className} column={column} data={data}>
        {column.cell(data)}
      </Cell>
    )}
  </Row>
})
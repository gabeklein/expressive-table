import { Grid } from './Grid';
import { either } from './util';

const Header = (props) => {
  const { header: Header } = props;
  const { columns } = Grid.get();

  Head: {
    overflow: hidden;
  }

  if(Header)
    <Header>
      <Row>
        {columns.map((column, i) => {
          const Head = either(column.head, props.head);

          return Head ? (
            <Head
              key={column.name}
              index={i}
              column={column}
              name={column.name}
              props={column.props}>
              {column.name}
            </Head>
          ) : (
            <div key={column.name}>
              {column.name}
            </div>
          )
        })}
      </Row>
    </Header>
}

const Row = () => {
  display: grid;
  gridTemplateColumns: $tableRowColumns;
  marginRight: $headerMarginRight;
  columnGap: $tableGridGap;
  position: relative;
  minHeight: fill;
}

export { Header };
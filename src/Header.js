import Grid from './Grid';
import { either } from './util';

const Header = (props) => {
  const { header: Header, padding } = props;
  const { is: control, columns } = Grid.tap();

  row: {
    display: grid;
    gridTemplateColumns: "var(--table-row-columns)";
    columnGap: "var(--table-grid-gap)";
    position: relative;
    minHeight: fill;
  }

  Head: {
    overflow: hidden;
  }

  if(Header)
    <Header context={control} padding={padding}>
      <row style={padding ? { marginRight: padding } : undefined}>
        {columns.map((column, i) => {
          const Head = either(column.head, props.head);

          if(Head)
            <Head
              key={column.name}
              context={control}
              index={i}
              column={column}
              name={column.name}
              props={column.props}>
              {column.name}
            </Head>
          else
            <div key={column.name}>
              {Head !== false && column.name}
            </div>
        })}
      </row>
    </Header>
}

export default Header;
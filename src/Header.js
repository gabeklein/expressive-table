import * as components from './components';
import Grid from './Grid';
import { either } from './util';

const Header = (props) => {
  const {
    ready,
    calibrate,
    columns,
    get: control
  } = Grid.tap();

  const Header = either(props.header, components.Header);

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
    marginRight: (props.padding);
  }

  sensor: {
    overflowY: scroll;
  }

  if(!ready || !Header)
    <sensor ref={calibrate} />
  else
    <Header context={control} padding={props.padding}>
      {columns.map((column, i) => {
        const Head = either(column.head, props.head, components.Head);

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
          <div key={column.name} />
      })}
    </Header>
}

export default Header;
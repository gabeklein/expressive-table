import * as normal from './components';
import Grid from './Grid';
import { either } from './util';

const Header = (props) => {
  const {
    header,
    head,
    ready,
    calibrate,
    columns,
    get: control
  } = Grid.tap();

  const padding = control.tap($ => (
    $.virtual.size > $.virtual.areaX ? $.padding : 0
  ));

  const Header = either(props.header, normal.Header);

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
    marginRight: (padding);
  }

  sensor: {
    overflowY: scroll;
  }

  if(!ready || !Header)
    <sensor ref={calibrate} />
  else
    <Header context={control} padding={padding}>
      {columns.map((column, i) => {
        const Head = either(column.head, props.head, normal.HeadCell);

        if(Head)
          <Head
            key={column.name}
            index={i}
            context={control}
            column={column}>
            {column.name}
          </Head>
        else
          <div key={column.name} />
      })}
    </Header>
}

export default Header;
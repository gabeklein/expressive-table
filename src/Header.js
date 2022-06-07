import { useCallback, useLayoutEffect, useState } from 'react';

import * as components from './components';
import Grid from './Grid';
import { either } from './util';

const Header = (props) => {
  const {
    is: control,
    columns
  } = Grid.tap();

  const [ scrollOffset, setOffset ] = useState();
  const padding = props.scrollY ? scrollOffset : 0;

  const Header = either(props.header, components.Header);
  const calibrate = useCallback(event => {
    if(event)
      setOffset(
        event.parentElement.scrollWidth -
        event.scrollWidth
      );
  });

  sensor: {
    overflowY: scroll;
  }

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
    marginRight: (padding);
  }

  if(scrollOffset === undefined)
    <sensor ref={calibrate} />
  else if(Header)
    <Header context={control} padding={padding}>
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
import { from, Model, ref } from '@expressive/mvc';
import { useCallback, useLayoutEffect, useState } from 'react';

import Grid from './Grid';
import { either } from './util';

const Header = (props) => {
  const { header: Header, padding } = props;
  const { is: control, columns } = Grid.tap();

  Header: {
    display: grid;
    gridGap: "1em";
    gridTemplateColumns: "var(--row-columns)";
    position: relative;
    marginRight: (padding);
  }

  Head: {
    overflow: hidden;
  }

  if(Header)
    <Header context={control} padding={padding}>
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
    </Header>
}

export default Header;
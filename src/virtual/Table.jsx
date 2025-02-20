import Model, { Provider } from '@expressive/react';
import { useLayoutEffect, useMemo, useState } from 'react';

import { Grid } from '../Grid';
import { DefaultHeader, DefaultCell, DefaultRow } from './components';
import { useGap, usePadding } from '../hooks';
import { either, uniqueId } from '../util';
import { Virtual } from './Virtual';

const Table = (props) => {
  <Provider for={{ Virtual }}>
    {props.children}
    <Body {...props} />
  </Provider>
}

const Body = (props) => {
  const {
    is: virtual,
    container,
    size,
    grid
  } = Virtual.get();

  const gridGap = useGap(props.gap);
  const padding = usePadding(props.children, container);

  container: {
    gridRows: min, "minmax(0, 1.0fr)";
    overflow: hidden;
  }

  <container className={props.className} style={{
    "--table-row-columns": grid.template,
    "--table-grid-gap": gridGap,
    "--header-margin-right": padding,
    ...props.style
  }}>
    <Provider for={virtual}>
      <Header {...props} />
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
        {props.after}
      </div>
    </Provider>
  </container>
}

/**
 * @type React.FC<{
 *  header: React.FC | false | undefined;
 *  head: React.FC;
 * }>
*/
const Header = (props) => {
  const { columns } = Grid.get();
  const {
    header: Header = DefaultHeader,
    head: HeadCell = DefaultCell
  } = props;

  if(!Header || !columns.length)
    return false;

  <Header>
    {columns.map((column, i) => {
      const Head = either(column.head, HeadCell);

      Head: {
        overflow: hidden;
      }

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
  </Header>
}

const Rows = (props) => {
  const grid = Grid.get();
  const { slice, size, empty } = Virtual.get();
  const {
    empty: Empty,
    row: Row = DefaultRow,
    refresh
  } = props;

  row: {
    position: absolute;
    right: 0;
    left: 0;
  }

  if(typeof Empty == "function")
    <Empty context={grid} />
  else if(empty)
    <Fragment>{Empty || false}</Fragment>
  else
    <div style={{ position: "relative", height: size }}>
      {slice.map(({ index, offset }) => {
        const row = grid.rows ? grid.rows[index] : index;
        const key = refresh ? Math.random() : uniqueId(row);

        <row key={key} style={{ top: offset }}>
          <Row index={index} data={row} {...props} />
        </row>
      })}
    </div>
}

export { Table };
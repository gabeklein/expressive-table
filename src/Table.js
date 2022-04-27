import Model, { Provider, ref } from '@expressive/mvc';
import { Fragment, memo, useLayoutEffect } from 'react';

import * as normal from './components';
import Grid from './Grid';

export const Table = (props) => {
  const Control = props.for || Grid;
  const Empty = props.empty;
  const {
    get: control,
    style,
    ready,
    virtual,
    calibrate
  } = Control.use();

  control.import(props);

  sensor: {
    overflowY: scroll;
  }

  container: {
    forward: className;
    gridRows: min, 1.0;
    overflow: hidden;
    style = {
      ...props.style,
      ...style
    }
  }

  <Provider of={control}>
    <container>
      {ready &&
        <Fragment>
          <Header for={control} />
          <Window for={control.virtual} component={Row}>
            {!control.length && Empty &&
              <Empty context={control} />
            }
          </Window>
        </Fragment>
      }
      <sensor ref={calibrate} />
      {props.children}
    </container>
  </Provider>
}

const Window = (props) => {
  const { container, slice, size } = props.for.use();

  <div ref={container} style={{ overflowY: "auto" }}>
    {props.children}
    <div style={{ position: "relative", height: size }}>
      {slice.map((p) => <props.component {...p} />)}
    </div>
  </div>
}

export const Column = memo((props) => {
  const control = Grid.get();

  useLayoutEffect(() => {
    control.register(props)
  }, []);

  return false;
})

const Header = ({ for: control }) => {
  const Header = either(control.header, normal.Header);
  const padding = control.tap($ => (
    $.virtual.size > $.virtual.areaX ? $.padding : 0
  ));

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
    marginRight: (padding);
  }

  if(Header)
    <Header context={control} padding={padding}>
      {control.columns.map((column, i) => {
        const Head = either(
          column.head,
          control.head,
          normal.HeadCell
        );

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
  else
    <div />
}

const Row = ({ index, offset }) => {
  const grid = Grid.tap();
  const data = grid.data && grid.data[index];
  const Row = grid.row || normal.Row;

  Row: {
    display: grid;
    position: absolute;
    right: 0;
    left: 0;
    height: "var(--row-height)";
    gridTemplateColumns: "var(--row-columns)";
  }

  <Row
    key={index}
    data={data}
    row={index}
    offset={offset}
    context={grid}>
    {grid.columns.map((column, i) => {
      const Cell = either(column.cell, grid.cell, normal.Cell);
      const content = column.render(index, grid, column);

      if(Cell)
        <Cell
          key={column.name}
          context={grid}
          index={i}
          name={column.name}
          data={data}
          column={column}
          row={index}>
          {content}
        </Cell>
      else
        <div key={column.name} />
    })}
  </Row>
}

/** Select first value defined but bail on falsey. */
function either(...from){
  for(const component of from){
    if(component === false)
      return null;

    if(typeof component == "function")
      return component;
  }
}
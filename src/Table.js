import Model, { Provider, ref } from '@expressive/mvc';
import { useLayoutEffect } from 'react';

import * as normal from './components';
import Grid from './Grid';

const UID_CACHE = new WeakMap();

export const Table = (props) => {
  const Control = props.for || Grid;
  const Empty = props.empty;
  const {
    data,
    style,
    length,
    get: control,
    virtual: {
      container,
      size
    }
  } = Control.use();

  control.import(props);

  container: {
    forward: className;
    gridRows: min, "minmax(0, 1.0fr)";
    overflow: hidden;

    style = {
      ...props.style,
      ...style
    };
  }

  <Provider of={control}>
    <container>
      <Header />
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows />
        {!length && !!Empty && (
          typeof Empty == "function"
            ? <Empty context={control} />
            : Empty
        )}
        {props.after}
        {props.children}
      </div>
    </container>
  </Provider>
}

export const Column = (props) => {
  const control = Grid.get();

  useLayoutEffect(() => {
    control.register(props);
  }, []);

  return false;
}

const Rows = () => {
  const {
    row,
    data,
    get: grid,
    columns,
    virtual: {
      slice,
      size
    }
  } = Grid.tap();

  const Row = row || normal.Row;

  <div style={{ position: "relative", height: size }}>
    {slice.map(({ index, offset }) => {
      const data = grid.data && grid.data[index];
      const key = data ? uniqueId(data) : index;

      Row: {
        display: grid;
        position: absolute;
        right: 0;
        left: 0;
        height: "var(--row-height)";
        gridTemplateColumns: "var(--row-columns)";
      }

      <Row
        context={grid}
        key={key}
        row={index}
        data={data}
        offset={offset}
        style={{ top: offset }}>
        {columns.map((column, i) => {
          const Cell = either(column.cell, grid.cell, normal.Cell);
          const content = column.render(index, grid, column);

          if(Cell)
            <Cell
              key={column.name}
              context={grid}
              index={i}
              name={column.name}
              props={column.props}
              data={data}
              column={column}
              row={index}>
              {content}
            </Cell>
          else
            <div key={column.name} />
        })}
      </Row>
    })}
  </div>
}

const Header = () => {
  const { header, head, ready, calibrate, get: control } = Grid.tap();
  const padding = control.tap($ => (
    $.virtual.size > $.virtual.areaX ? $.padding : 0
  ));

  const Header = either(control.header, normal.Header);

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
      {control.columns.map((column, i) => {
        const Head = either(column.head, control.head, normal.HeadCell);

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

/** Select first value defined but bail on falsey. */
function either(...from){
  for(const component of from){
    if(component === false)
      return null;

    if(typeof component == "function")
      return component;
  }
}

function uniqueId(object){
  if(typeof object !== "object")
    return object;

  let uid = UID_CACHE.get(object)

  if(!uid)
    UID_CACHE.set(object, uid = Math.random())
    
  return uid;
}
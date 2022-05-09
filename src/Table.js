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
      <Header {...props} />
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
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

const Rows = (props) => {
  const {
    data,
    columns,
    get: grid,
    virtual: {
      slice,
      size
    }
  } = Grid.tap();

  const Row = props.row || normal.Row;

  <div style={{ position: "relative", height: size }}>
    {slice.map(({ index, offset }) => {
      const entry = data ? data[index] : index;
      const key = entry ? uniqueId(entry) : index;

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
        data={entry}
        offset={offset}
        style={{ top: offset }}>
        {columns.map((column, i) => {
          const Cell = either(column.cell, props.cell, normal.Cell);
          const content = column.render(entry, index);

          if(Cell)
            <Cell
              key={column.name}
              context={grid}
              index={i}
              name={column.name}
              props={column.props}
              data={entry}
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
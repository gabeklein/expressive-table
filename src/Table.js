import { Provider } from '@expressive/mvc';
import { useState } from 'react';
import { Children, memo, useLayoutEffect } from 'react';

import Grid, { DataType } from './Grid';
import Window from './Window';

export const Table = (props) => do {
  const Model = props.for || Grid;
  const virtual = Model.use();
  const [ padding, setPadding ] = useState(0);

  virtual.useProps(props);

  container: {
    style = Object.assign({}, props.style, virtual.vars);
    forward: className;
    gridRows: min, auto, min;
    position: relative;
    overflow: hidden;
  }

  empty: {
    if(!virtual.length && virtual.Empty)
      <virtual.Empty context={virtual} />
  }

  sensor: {
    overflowY: scroll;
    ref = (element) => {
      if(element)
        setPadding(
          element.parentElement.scrollWidth -
          element.scrollWidth
        );
    }
  }

  table: {
    if(virtual.ready)
      <this>
        <Header for={virtual} padding={padding} />
        <Window for={virtual} component={Row}>
          <empty />
        </Window>
        {props.footer}
      </this>
    else
      <sensor />
  }

  <Provider of={virtual}>
    <container>
      {props.children}
      <table />
    </container>
  </Provider>
}

export const Column = memo((props) => {
  const virtual = Grid.tap();

  useLayoutEffect(() => {
    const index = virtual.columns.length;
    const column = new DataType(props, index);
  
    virtual.columns.push(column);
  }, [])

  return false;
})

const Header = ({ for: context, padding }) => do {
  const Header = either(context.Header, DefaultHeader);

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
    marginRight: (padding);
  }

  if(Header)
    <Header context={context} padding={padding}>
      {context.columns.map((column, i) => do {
        const Type =
          either(column.Head, context.Head, DefaultHeadCell);

        if(Type)
          <Type key={column.name} context={context} column={column} />;
        else
          <div key={column.name} />
      })}
    </Header>
}

const Row = ({ index, offset, context }) => do {
  const Row = either(context.Row, DefaultRow);

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
    id={index}
    row={index}
    offset={offset}
    context={context}>
    {context.columns.map((column, i) => do {
      const content = column.render
        ? column.render(index, context, column)
        : context.render(index, column, context);

      const Type =
        either(column.Cell, context.Cell, DefaultCell);

      if(Type)
        <Type
          key={column.name}
          context={context}
          column={column}
          row={index}
          id={index}>
          {content}
        </Type>
      else
        <div key={column.name} />
    })}
  </Row>
}

const DefaultHeader = (props) => do {
  forward: className, style;
  padding: 0, 10;

  <this>
    {props.children}
  </this>
}

const DefaultRow = (props) => do {
  forward: className;
  padding: 0, 10;

  <this style={{ top: props.offset }}>
    {props.children}
  </this>
}

const DefaultHeadCell = (props) => do {
  <div>{props.column.name}</div>
}

const DefaultCell = (props) => do {
  fontSize: 0.9;

  <this>{props.children}</this>;
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
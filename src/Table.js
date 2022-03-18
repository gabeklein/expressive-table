import Model, { Provider } from '@expressive/mvc';
import { useState } from 'react';
import { Children, memo, useLayoutEffect } from 'react';

import Grid, { DataType } from './Grid';
import Window from './Window';

class Config extends Model {
  ready = false;
  padding = 0;

  header = undefined;
  head = undefined;
  cell = undefined;
  row = undefined;
  empty = undefined;

  componentDidMount(){
    this.ready = true;
  }
}

export const Table = (props) => do {
  const Control = props.for || Grid;
  const control = Control.using(props, [ "length" ]);
  const config = Config.using(props);

  control.useProps(props)

  container: {
    style = Object.assign({}, props.style, control.vars);
    forward: className;
    gridRows: min, auto, min;
    position: relative;
    overflow: hidden;
  }

  empty: {
    if(!control.length && config.empty)
      <control.Empty context={control} />
  }

  sensor: {
    overflowY: scroll;
    ref = (element) => {
      if(element){
        config.padding =
          element.parentElement.scrollWidth -
          element.scrollWidth
      }
    }
  }

  table: {
    if(config.ready)
      <this>
        <Header for={control} padding={config.padding} />
        <Window for={control} component={Row}>
          <empty />
        </Window>
        {props.footer}
      </this>
    else
      <sensor />
  }

  <Provider of={{ control, config }}>
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
  const config = Config.tap();
  const Header = either(config.header, DefaultHeader);

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
    marginRight: (padding);
  }

  if(Header)
    <Header context={context} padding={padding}>
      {context.columns.map((column, i) => do {
        const HeadCell =
          either(column.head, config.head, DefaultHeadCell);

        if(HeadCell)
          <HeadCell
            key={column.name}
            context={context}
            column={column}
          />;
        else
          <div key={column.name} />
      })}
    </Header>
}

const Row = ({ index, offset, context }) => do {
  const config = Config.tap();
  const Row = either(config.row, DefaultRow);

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

      const Cell =
        either(column.cell, config.cell, DefaultCell);

      if(Cell)
        <Cell
          key={column.name}
          context={context}
          column={column}
          row={index}
          id={index}>
          {content}
        </Cell>
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
import Model, { Provider, ref } from '@expressive/mvc';
import { memo, useLayoutEffect } from 'react';

import Grid from './Grid';
import Window from './Window';

class Config extends Model {
  ready = false;
  padding = 0;

  header = undefined;
  head = undefined;
  cell = undefined;
  row = undefined;

  calibrate = ref(e => {
    if(e)
      this.padding =
        e.parentElement.scrollWidth -
        e.scrollWidth
  })

  componentDidMount(){
    this.ready = true;
  }
}

export const Table = (props) => do {
  const Control = props.for || Grid;
  const control = Control.use();
  const config = Config.using(props);
  const Empty = props.empty;

  control.import(props, [ "length", "data" ]);

  useLayoutEffect(() => {
    return control.effect(state => {
      if(state.end && props.didEnd)
        props.didEnd();          
    });
  }, []);

  container: {
    style = Object.assign({}, props.style, control.style);
    forward: className;
    gridRows: min, auto, min;
    position: relative;
    overflow: hidden;
  }

  empty: {
    if(!control.length && Empty)
      <Empty context={control} />
  }

  sensor: {
    overflowY: scroll;
  }

  table: {
    if(config.ready)
      <this>
        <Header for={control} config={config} />
        <Window for={control} component={Row}>
          <empty />
        </Window>
        {props.footer}
      </this>
    else
      <sensor ref={config.calibrate} />
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
    let { size, render, value, name } = props;

    switch(typeof size){
      case "number":
        size = size + "px";
        break;

      case "undefined":
        size = "1fr";
    }

    switch(typeof value){
      case "function":
        render = (row, ctx) => value(ctx.data[row], row);
        break;

      case "string":
        render = (row, ctx) => ctx.data[row][value];
        if(!name)
          name = value;
    }
  
    virtual.columns.push({
      name: name || String(index),
      size,
      index,
      render,
      head: props.head,
      cell: props.cell
    });
  }, [])

  return false;
})

const Header = ({ for: context, config }) => do {
  const Header = either(config.header, DefaultHeader);
  const padding = context.tap($ => {
    return $.size > $.areaX ? config.padding : 0;
  })

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
    marginRight: (padding);
  }

  if(Header)
    <Header context={context} padding={padding}>
      {context.columns.map((column, i) => do {
        const Head =
          either(column.head, config.head, DefaultHeadCell);

        if(Head)
          <Head
            key={column.name}
            index={i}
            context={context}
            column={column}>
            {column.name}
          </Head>
        else
          <div key={column.name} />
      })}
    </Header>
}

const Row = ({ index, offset, context }) => do {
  const config = Config.tap();
  const Row = either(config.row, DefaultRow);
  const data = context.data && context.data[index];

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
  overflow: hidden;
  paddingR: "1.2em";

  content: {
    whiteSpace: nowrap;
    overflow: hidden;
  }
  
  <this>
    <content>
      {props.children}
    </content> 
  </this>
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
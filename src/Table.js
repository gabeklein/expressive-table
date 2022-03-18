import { Children, useLayoutEffect } from 'react';

import Grid from './Grid';
import Window from './Window';

export const Table = (props) => do {
  const Model = props.for || Grid;
  const virtual = Model.use();

  virtual.useProps(props);

  forward: className;
  gridRows: min, auto, min;
  position: relative;
  overflow: hidden;

  <this style={{ ...props.style, ...virtual.css }}>
    <Header for={virtual} />
    <Window for={virtual} component={Row}>
      {!virtual.length && virtual.Empty && 
        <virtual.Empty context={virtual} />}
    </Window>
    {props.footer}
  </this>
}

export const Col = (_props) => {
  throw new Error("Used <Col /> component outside of a <Table />, this is not allowed.");
}

const Header = ({ for: context }) => do {
  const Header = either(context.Header, DefaultHeader);

  Header: {
    display: grid;
    position: relative;
    gridTemplateColumns: "var(--row-columns)";
  }

  if(Header)
    <Header context={context}>
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
  forward: className;
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
  div: {
    fontSize: "0.9em";
  }

  <div>{props.children}</div>;
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
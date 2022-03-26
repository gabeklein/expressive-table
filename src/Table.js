import Model, { Provider, ref } from '@expressive/mvc';
import { Fragment, memo, useLayoutEffect } from 'react';

import * as normal from './components';
import Grid from './Grid';
import Window from './Window';

class Config extends Model {
  ready = false;
  padding = 0;

  header = undefined;
  head = undefined;
  cell = undefined;
  row = undefined;

  calibrate = ref(event => {
    if(event)
      this.padding =
        event.parentElement.scrollWidth -
        event.scrollWidth
  })

  componentDidMount(){
    this.ready = true;
  }
}

export const Table = (props) => {
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
    style = { ...props.style, ...control.style }
    forward: className;
    gridRows: min, auto;
    position: relative;
    overflow: hidden;
  }

  sensor: {
    overflowY: scroll;
  }

  <Provider of={{ control, config }}>
    <sensor ref={config.calibrate} />
    <container>
      {props.children}
      {config.ready &&
        <Fragment>
          <Header for={control} config={config} />
          <Window for={control} component={Row}>
            {!control.length && Empty &&
              <Empty context={control} />
            }
          </Window>
        </Fragment>
      }
    </container>
  </Provider>
}

export const Column = memo((props) => {
  const { register } = Grid.tap();

  useLayoutEffect(() => register(props), [])

  return false;
})

const Header = ({ for: context, config }) => {
  const Header = either(config.header, normal.Header);
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
      {context.columns.map((column, i) => {
        const Head =
          either(column.head, config.head, normal.HeadCell);

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
  else
    <div />
}

const Row = ({ index, offset, context }) => {
  const config = Config.tap();
  const data = context.data && context.data[index];
  const Row = either(config.row, normal.Row);

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
    {context.columns.map((column, i) => {
      const content = column.render
        ? column.render(index, context, column)
        : context.render(index, column, context);

      const Cell =
        either(column.cell, config.cell, normal.Cell);

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

/** Select first value defined but bail on falsey. */
function either(...from){
  for(const component of from){
    if(component === false)
      return null;

    if(typeof component == "function")
      return component;
  }
}
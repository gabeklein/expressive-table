import * as components from './components';
import Grid from './Grid';
import { either } from './util';
import Virtual from './Virtual';

const UID_CACHE = new WeakMap();

const Rows = (props) => {
  const grid = Grid.get();
  const { slice, size, container, length } = Virtual.tap();
  const { empty: Empty } = props;

  row: {
    position: absolute;
    right: 0;
    left: 0;
  }

  if(length)
    <div style={{ position: "relative", height: size }}>
      {slice.map(({ index, offset }) => {
        const row = grid.rows ? grid.rows[index] : index;
        const key = row ? uniqueId(row) : index;

        <row key={key} style={{ top: offset }}>
          <Row index={index} data={row} {...props} />
        </row>
      })}
    </div>
  else if(typeof Empty == "function")
    <Empty context={grid} />
  else
    <this>{Empty || false}</this>
}

const Row = ({ index, data, row, cell }) => {
  const { get: context, columns } = Grid.get();
  const Row = row || components.Row;

  Row: {
    display: grid;
    gridTemplateColumns: "var(--row-columns)";
    height: "var(--row-height)";
  }

  <Row
    context={context}
    index={index}
    row={data}>
    {columns.map((column, i) => {
      const Cell = either(column.cell, cell, components.Cell);
      const content = (() => {
        try {
          return column.render(data, index)
        }
        catch(err){
          // TODO: why is this necessary?
          return "";
        }
      })();

      if(Cell)
        <Cell
          key={column.name}
          context={context}
          index={i}
          row={data}
          column={column}
          name={column.name}
          props={column.props}>
          {content}
        </Cell>
      else
        <div key={column.name} />
    })}
  </Row>
}

function uniqueId(object){
  if(typeof object !== "object")
    return object;

  let uid = UID_CACHE.get(object);

  if(!uid)
    UID_CACHE.set(object, uid = Math.random());
    
  return uid;
}

export default Rows;
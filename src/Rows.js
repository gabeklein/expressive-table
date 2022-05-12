import * as normal from './components';
import Grid from './Grid';
import { either } from './util';

const UID_CACHE = new WeakMap();

const Rows = (props) => {
  const {
    get: grid,
    data,
    columns,
    virtual: {
      length,
      slice,
      size
    }
  } = Grid.tap();

  const Row = props.row || normal.Row;
  const Empty = props.empty;

  if(length)
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
            const content = (() => {
              try {
                return column.render(entry, index)
              }
              catch(err){
                // TODO: why is this necessary?
                return "";
              }
            })();

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
  else if(typeof Empty == "function")
    <Empty context={grid} />
  else
    <this>
      {Empty}
    </this>
}

function uniqueId(object){
  if(typeof object !== "object")
    return object;

  let uid = UID_CACHE.get(object)

  if(!uid)
    UID_CACHE.set(object, uid = Math.random())
    
  return uid;
}

export default Rows;
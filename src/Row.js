import Grid from './Grid';
import { either } from './util';

const Row = ({ index, data, row, cell }) => {
  const { is: context, columns } = Grid.get();
  const Row = row;

  row: {
    display: grid;
    columnGap: "var(--table-grid-gap)";
    gridTemplateColumns: "var(--table-row-columns)";
    minHeight: fill;
  }

  Cell: {
    overflow: hidden;
  }

  <Row
    context={context}
    index={index}
    row={data}>
    <row>
      {columns.map((column, i) => {
        const Cell = either(column.cell, cell);

        const content = Cell !== false && (() => {
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
          <div key={column.name}>
            {content}
          </div>
      })}
    </row>
  </Row>
}

export default Row;
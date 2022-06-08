import Grid from './Grid';
import { either } from './util';

const Row = ({ index, data, row, cell }) => {
  const { is: context, columns } = Grid.get();
  const Row = row;

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
      const Cell = either(column.cell, cell);
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

export default Row;
import { Grid } from '../Grid';
import { Row } from '../Row';
import { uniqueId } from '../util';
import { Virtual } from './Virtual';

const Rows = (props) => {
  const grid = Grid.get();
  const { slice, size, length } = Virtual.get();
  const { empty: Empty } = props;

  row: {
    position: absolute;
    right: 0;
    left: 0;
  }

  if(length)
    <div style={{ position: "relative", height: size }}>
      {slice.map(({ index, offset }) => {
        const row = grid.rows
          ? grid.rows[index]
          : index;

        const key = props.refresh
          ? Math.random()
          : uniqueId(row);

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

export { Rows };
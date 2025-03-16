import { Column, Grid } from '../src';

class Table extends Grid {
  data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: `Category ${(i % 4) + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    stock: Math.floor(Math.random() * 50) + 1,
    active: Math.random() > 0.5,
  }))

  row(index){
    return this.data[index];
  }

  cell(row, column){
    return row[column.id];
  }
}

const Demo = () => {
  width: fill;
  maxWidth: 1000;
  margin: 20, auto;
  backgroundColor: 0xffffff;
  radius: 8;
  overflow: hidden;
  border: 0xeee;
  fontFamily: "sans-serif";
  fontSize: 14;
  height: 500;
  overflowY: scroll;

  Table: {
    height: 500;
    width: fill;
    margin: -1;
  }

  <Table>
    <Column name="ID" size={0.5} />
    <Column name="Name" />
    <Column name="Category" />
    <Column name="Stock" />
    <Column name="Price" Cell={Price} />
    <Column name="Claim Status" id="active" Cell={Status} />
  </Table>
};

/** @type React.FC<Grid.CellProps> */
export const Price = ({ children, data }) => {
  padding: 16;
  color: 0x4b5563;

  <td this>
    ${children}
  </td>
}

const Status = ({ data }) => {
  const { active } = data;

  display: flex;
  alignItems: center;
  margin: 0, 20;
  height: fill;
  fontSize: 12;

  if(active)
    $color: green;
  else
    $color: red;

  inner: {
    radius: round;
    padding: 3, 10;
    color: $color;
    textAlign: center;
    border: $color;
    position: relative;
    overflow: hidden;
    width: 50;
  }

  bg: {
    absolute: fill;
    background: $color;
    opacity: 0.1;
  }

  <td this>
    <inner>
      {active ? "Active" : "Closed"}
      <bg />
    </inner>
  </td>
}

export default Demo;
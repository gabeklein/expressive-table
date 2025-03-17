import { Column, Table } from '../../src';
import { Status } from './Status';

class Data extends Table {
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
  maxHeight: 500;
  overflowY: scroll;

  Data: {
    width: fill;
    margin: -1;
  }

  Column: {
    borderBottom: 0xeee;
  }
  
  <Data>
    <Column name="ID" />
    <Column name="Name" />
    <Column name="Category" />
    <Column name="Stock" />
    <Column name="Price">
      {data => `$${data.price}`}
    </Column>
    <Column name="Claim Status">
      {data => {
        <Status active={data.active} />
      }}
    </Column>
  </Data>
};

export default Demo;
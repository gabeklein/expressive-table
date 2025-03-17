import { Column, Virtual } from '../../src';
import { Status } from './Status';

class Table extends Virtual {
  data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: `Category ${(i % 4) + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    stock: Math.floor(Math.random() * 50) + 1,
    active: Math.random() > 0.5,
  }))
}

const Demo = () => {
  width: fill;
  height: 500;
  maxWidth: 1000;
  margin: 20, auto;
  backgroundColor: 0xffffff;
  radius: 8;
  overflow: hidden;
  border: 0xeee;

  Table: {
    height: fill;
    margin: -1;
    fontFamily: "sans-serif";
    fontSize: 14;
  }
    
  <Table>
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
  </Table>
};

export default Demo;
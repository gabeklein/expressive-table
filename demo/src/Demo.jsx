import { Column, Table } from "../../src";

const data = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: `Category ${(i % 4) + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
  stock: Math.floor(Math.random() * 50) + 1
}));

const Demo = () => {
  width: fill;
  maxWidth: '1000px';
  margin: '20px auto';
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
  borderRadius: '8px';
  backgroundColor: '#ffffff';

  Table: {
    height: 400;
  }

  <Table
    data={data}
    rowHeight={53}
    bufferItems={5}
  >
    <Column name="ID" />
    <Column name="Name" />
    <Column name="Category" />
    <Column name="Price" />
    <Column name="Stock" />
  </Table>
};

export default Demo;
import Model, { get, Provider, ref, set } from '@expressive/react';
import React, { useState } from 'react';

class Control extends Model {
  data = [];
  scrollTop = 0;
  rowHeight = 53;
  containerHeight = 0;
  bufferItems = 2;
  columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'stock', header: 'Stock' }
  ];
  
  range = get(this.getRange);

  outer = ref((element) => {
    const resizeObserver = new ResizeObserver(() => {
      this.containerHeight = element.clientHeight;
    });

    resizeObserver.observe(element);
    
    element.addEventListener('scroll', this.onScroll);

    return () => {
      element.removeEventListener('scroll', this.onScroll);
      resizeObserver.disconnect();
    }
  });

  inner = ref((element) => {
    const { style } = element;

    const done1 = this.get(({ data, rowHeight }) => {
      style.height = `${data.length * rowHeight}px`;
    });

    const done2 = this.get(({ columns }) => {
      const template = columns.map(() => '1fr').join(' ');
      style.setProperty("--table-row-columns", template);
    });

    return () => {
      done1();
      done2();
    }
  });

  body = ref((element) => {
    return this.get(({ rowHeight, range }) => {
      element.style.setProperty(
        "transform", `translateY(${range[0] * rowHeight}px)`
      );
    })
  });

  onScroll(event){
    this.scrollTop = event.target.scrollTop;
  }

  getRange(){
    const { rowHeight, containerHeight, bufferItems, data, scrollTop, is: { range } } = this;
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferItems);
    const end = Math.min(
      data.length,
      Math.ceil((scrollTop + containerHeight) / rowHeight) + bufferItems
    )

    if(range && range[0] == start && range[1] == end)
      return range;

    return [start, end];
  }
}

// Virtual component
const Virtual = (props) => {
  const { style, className, ...rest } = props;
  const control = Control.use(rest, true);

  <Provider for={control}>
    <TableBody style={style} className={className} />
  </Provider>
};

const TableBody = () => {
  const {
    body,
    columns,
    data,
    inner,
    outer,
    range,
  } = Control.get();

  position: 'relative';
  overflowY: 'auto';

  gridRow: {
    display: grid;
    gridTemplateColumns: $tableRowColumns;
    marginRight: $headerMarginRight;
    columnGap: $tableGridGap;
  }

  <this ref={outer}>
    <inner ref={inner}>
      <DefaultHeader gridRow>
        {columns.map(column => (
          <DefaultHead key={column.key} column={column} />
        ))}
      </DefaultHeader>
      <body ref={body}>
        {data.slice(...range).map((item) => {
          <DefaultRow gridRow key={item.id}>
            {columns.map(column => {
              <DefaultColumn key={column.key} column={column} data={item} />
            })}
          </DefaultRow>
        })}
      </body>
    </inner>
  </this>
}

const DefaultHeader = () => {
  backgroundColor: '#f3f4f6';
  zIndex: 10;
  position: sticky;
  top: 0;
}

const DefaultHead = ({ column }) => {
  padding: '16px';
  textAlign: 'left';
  fontWeight: 500;
  color: '#4b5563';
  borderBottom: 0xe5e7eb;

  <this>
    {column.header}
  </this>
}

const DefaultRow = () => {
  borderBottom: '1px solid #e5e7eb';
  backgroundColor: '#ffffff';
  transition: 'background-color 0.2s';


  if(":hover")
    backgroundColor: '#f9fafb';

  <this />
}

const DefaultColumn = ({ column, data }) => {
  padding: '16px';
  color: '#4b5563';

  <this key={column.key}>
    {column.key === 'price' ? `$${data[column.key]}` : data[column.key]}
  </this>
}

// Demo component with sample data
const Demo = () => {
  // Generate sample data
  const data = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    category: `Category ${(i % 4) + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    stock: Math.floor(Math.random() * 50) + 1
  }));

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'stock', header: 'Stock' }
  ];

  width: fill;
  maxWidth: '1000px';
  margin: '20px auto';
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
  borderRadius: '8px';
  backgroundColor: '#ffffff';

  Virtual: {
    height: 400;
  }

  <Virtual
    data={data}
    columns={columns}
    rowHeight={53}
    bufferItems={2}
  />
};

export default Demo;
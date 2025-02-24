import Model, { get, ref, set } from '@expressive/react';

const INDEX = new Map<ITable, number>();

declare namespace ITable {
  interface CellProps {
    column: IColumn;
    data: { [key: string]: any };
  }

  interface HeadProps {
    column: IColumn;
  }

  interface RowProps {
    data: { [key: string]: any };
    index: number;
  }
}

class ITable extends Model {
  Row?: React.FC<ITable.RowProps> = undefined;
  Cell?: React.FC<ITable.CellProps> = undefined;
  Head?: React.FC<ITable.HeadProps> = undefined;
  Header?: React.FC = undefined;

  columns = [] as IColumn[];
  data = [];

  scrollTop = 0;
  rowHeight = 53;
  fullHeight = 0;
  bufferItems = 2;

  range = get(this.getRange);

  outer = ref<HTMLDivElement>((element) => {
    const resizeObserver = new ResizeObserver(() => {
      this.fullHeight = element.clientHeight;
    });

    const onScroll = () => {
      this.scrollTop = element.scrollTop;
    }

    resizeObserver.observe(element);
    
    element.addEventListener('scroll', onScroll);

    return () => {
      element.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
    }
  });

  inner = ref<HTMLDivElement>((element) => {
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

  body = ref<HTMLDivElement>((element) => {
    return this.get(({ rowHeight, range }) => {
      element.style.setProperty(
        "transform", `translateY(${range[0] * rowHeight}px)`
      );
    })
  });

  getRange(): [number, number] {
    const {
      is: { range },
      bufferItems,
      data,
      fullHeight,
      rowHeight,
      scrollTop,
    } = this;

    const start = Math.max(0,
      Math.floor(scrollTop / rowHeight) - bufferItems
    );

    const end = Math.min(
      data.length,
      Math.ceil((scrollTop + fullHeight) / rowHeight) + bufferItems
    )

    if(range && range[0] == start && range[1] == end)
      return range;

    return [start, end];
  }

  static setup(props: Model.Assign<ITable>){
    const self = this.use(props, true);
    INDEX.delete(self.is);
    return self;
  }
}

class IColumn extends Model {
  table = get(ITable);

  name: string = "";
  size?: string | number = 1;
  index: number = -1;

  key = set(() => this.name.toLowerCase());

  Cell = undefined;
  Head = undefined;

  static setup(props: Model.Assign<IColumn>){
    const column = this.use(() => () => {
      column.table.columns.splice(column.index, 1);
      column.table.set("cols");
    });

    const { index, table } = column.is;
    const now = INDEX.get(table) || 0;

    INDEX.set(table, now + 1);

    if(index === now)
      return;

    column.index = now;
    table.columns[now] = column.is;
    table.set("cols");

    column.set(props);

    return null;
  }
}

export { ITable, IColumn };
import Model, { get, ref, set } from '@expressive/react';

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

    this.get(({ data, rowHeight }) => {
      style.height = `${data.length * rowHeight}px`;
    });

    this.get(({ columns }) => {
      const template = columns.map(() => '1fr').join(' ');
      style.setProperty("--table-row-columns", template);
    });
  });

  body = ref<HTMLDivElement>((element) => {
    this.get(({ rowHeight, range }) => {
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
}

class IColumn extends Model {
  table = get(ITable);

  name: string = "";
  size?: string | number = 1;
  index: number = -1;

  className = "";

  id = set(() => this.name.toLowerCase());

  Cell = undefined;
  Head = undefined;

  register(){
    this.index = this.table.columns.push(this) - 1;
  }

  static setup(props: Model.Assign<IColumn>){
    const x = this.use(props, true)
    x.register();
    return null;
  }
}

export { ITable, IColumn };
import Model, { get, ref, set } from '@expressive/react';
import { Children, cloneElement, createElement, Fragment, isValidElement } from 'react';

import { Body } from './Body';
import { DefaultCell, DefaultHead, DefaultHeader, DefaultRow } from './components';

declare namespace Grid {
  interface CellProps {
    column: Column;
    data: { [key: string]: any };
  }

  interface HeadProps {
    column: Column;
  }

  interface RowProps {
    data: { [key: string]: any };
    index: number;
  }

  interface BodyProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }
}

class Grid extends Model {
  Body: React.FC<Grid.BodyProps> = Body;
  Row: React.FC<Grid.RowProps> = DefaultRow;
  Cell: React.FC<Grid.CellProps> = DefaultCell;
  Head: React.FC<Grid.HeadProps> = DefaultHead;
  Header: React.FC = DefaultHeader;

  columns = [] as Column[];
  data = [];

  scrollTop = 0;
  rowHeight = 50;
  fullHeight = 0;
  bufferItems = 5;

  range = get(this.getRange);

  render(props: Grid.BodyProps) {
    const { Body } = this;
    const { children, ...rest } = props;

    this.columns = [];

    return createElement(Fragment, null,
      Children.map(children, (child) => (
        isValidElement(child) && child.key == null
          ? cloneElement(child, { key: child.props.id || child.props.name })
          : child
      )),
      createElement(Body, rest)
    );
  }

  outer = ref<HTMLDivElement>((element) => {
    const resizeObserver = new ResizeObserver(() => {
      this.fullHeight = element.clientHeight;
    });

    const onScroll = () => {
      this.scrollTop = element.scrollTop;
    }

    element.addEventListener('scroll', onScroll);
    resizeObserver.observe(element);

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

class Column extends Model {
  table = get(Grid);

  name: string = "";
  size?: string | number = 1;
  index: number = -1;

  className = "";

  id = set(() => this.name.toLowerCase());

  Cell = undefined;
  Head = undefined;

  render(){
    this.index = this.table.columns.push(this) - 1;
    return null;
  }
}

export { Grid as Grid, Column };
import { get, ref } from '@expressive/react';
import { ReactNode } from 'react';

import { Column, Grid } from '../Grid';
import { DefaultBody, DefaultCell, DefaultHead, DefaultHeader, DefaultRow } from './Body';

export class Virtual<T extends Record<string, any> = any> extends Grid<T> {
  static Body = DefaultBody;
  static Row = DefaultRow;
  static Cell = DefaultCell;
  static Head = DefaultHead;
  static Header = DefaultHeader;
  
  scrollTop = 0;
  rowHeight = 50;
  fullHeight = 0;
  bufferItems = 5;

  gap = 10;
  range = get(this.getRange);
  length = get(this.getLength);
  rows = get(this.getRows);

  data = [] as T[];

  row(key: string | number) {
    return this.data[key as number];
  }

  cell(row: T, cell: Column): ReactNode {
    return row[cell.id];
  }

  template = get(this, ({ columns }) => (
    columns.map(({ size }) => (
      typeof size == 'string' ? size : `${size || 1}fr`
    ))
  ));

  outer = ref<HTMLDivElement>(element => {
    const { style } = element;
    const resizeObserver = new ResizeObserver(() => {
      this.fullHeight = element.clientHeight;
    });

    const onScroll = () => {
      this.scrollTop = element.scrollTop;
    }

    element.addEventListener('scroll', onScroll);
    resizeObserver.observe(element);

    this.get(({ template, gap }) => {
      style.setProperty("--table-columns", template.join(' '));
      style.setProperty("--table-gap", typeof gap == "number" ? `${gap}px` : gap);
    });

    return () => {
      element.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
    }
  });

  inner = ref<HTMLDivElement>(({ style }) => {
    this.get(({ rowHeight, length }) => {
      style.setProperty("height", `${length * rowHeight}px`);
    });
  });

  body = ref<HTMLDivElement>(({ style }) => {
    this.get(({ range, rowHeight }) => {
      style.setProperty("transform", `translateY(${range[0] * rowHeight}px)`);
    })
  });

  getRows(): number[] {
    const [ start, end ] = this.range;
    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  getLength() {
    return this.data.length;
  }

  getRange(): [number, number] {
    const {
      is: { range },
      bufferItems,
      fullHeight,
      length,
      rowHeight,
      scrollTop,
    } = this;

    const start = Math.max(0,
      Math.floor(scrollTop / rowHeight) - bufferItems
    )

    const end = Math.min(length,
      Math.ceil((scrollTop + fullHeight) / rowHeight) + bufferItems
    )

    if(range && range[0] == start && range[1] == end)
      return range;

    return [start, end];
  }
}
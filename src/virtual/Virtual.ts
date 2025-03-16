import { get, ref } from '@expressive/react';

import { Grid } from '../Grid';
import { Body } from './Body';

export class Virtual<T extends {} = any> extends Grid<T> {
  static Body = Body;
  
  scrollTop = 0;
  rowHeight = 50;
  fullHeight = 0;
  bufferItems = 5;

  gap = 10;
  range = get(this.getRange);
  length = get(this.getLength);
  rows = get(this.getRows);

  template = get(this, ({ columns }) => (
    columns.map(({ size }) => (
      typeof size == 'string' ? size : `${size || 1}fr`
    ))
  ));

  outer = ref<HTMLDivElement>(element => {
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

  inner = ref<HTMLDivElement>(({ style }) => {
    this.get(({ length, rowHeight, template, gap }) => {
      style.setProperty("height", `${length * rowHeight}px`);
      style.setProperty("--table-columns", template.join(' '));
      style.setProperty("--table-gap", typeof gap == "number" ? `${gap}px` : gap);
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
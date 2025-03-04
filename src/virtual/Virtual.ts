import { get, ref } from '@expressive/react';

import { Grid } from '../Grid';
import { Body } from './Body';

export class Virtual extends Grid {
  Body = Body;

  scrollTop = 0;
  rowHeight = 50;
  fullHeight = 0;
  bufferItems = 5;

  gap = 10;
  range = get(this.getRange);
  length = get(this.getLength);
  slice = get(this.getSlice);

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

  inner = ref<HTMLDivElement>(element => {
    this.get(({ length, rowHeight, template, gap }) => {
      element.style.setProperty("height", `${length * rowHeight}px`);
      element.style.setProperty("--table-columns", template.join(' '));
      element.style.setProperty("--table-gap", `${gap}px`);
    });
  });

  body = ref<HTMLDivElement>(element => {
    this.get(({ range, rowHeight }) => {
      element.style.setProperty("transform", `translateY(${range[0] * rowHeight}px)`);
    })
  });

  getSlice() {
    return this.data.slice(...this.range);
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
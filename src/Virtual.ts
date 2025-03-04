import Model, { get, ref } from '@expressive/react';

import { Grid } from './Grid';

export class Virtual extends Model {
  grid = get(Grid);

  scrollTop = 0;
  rowHeight = 50;
  fullHeight = 0;
  bufferItems = 5;

  range = get(this.getRange);

  length = get(this, ({ grid }) => {
    return grid.data.length;
  });

  slice = get(this, ({ range, grid }) => {
    return grid.data.slice(...range);
  })

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

    this.get(({ length, rowHeight }) => {
      style.height = `${length * rowHeight}px`;
    });

    this.grid.get(({ template }) => {
      style.setProperty("--table-row-columns", template.join(' '));
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
      length,
      fullHeight,
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
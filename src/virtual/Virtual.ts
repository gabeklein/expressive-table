import Model, { get, ref } from "@expressive/mvc";

const MODE_DOWN = Object.freeze({
  sizeX: "height",
  sizeY: "width",
  fromX: "top",
  fromY: "left",
  scrollX: "scrollTop"
} as const);

export type Type<T extends Virtual> =
  ReturnType<T["getItem"]>;

class Virtual extends Model {
  container = ref(observe);

  length = 0;
  itemSize = 40;
  overscan = 0;

  didEnd?: () => void = undefined;

  size = get(this, $ => $.itemSize * $.length);

  range = get(() => this.getVisibleRange);

  bottom = get(this, $ => {
    const frame = $.offset + $.areaX + $.overscan;
    const bottom = frame >= $.size;

    if(bottom && this.didEnd)
      this.didEnd();

    return bottom;
  });

  slice = get(this, state => {
    const [ start, end ] = state.range;
    const items = [];

    if(state.length === 0)
      return [];

    if(end >= start)
      for(let i = start; i <= end; i++)
        items.push(this.getItem(i));

    return items as Type<this>[];
  });

  DOM = MODE_DOWN;

  areaX = 0;
  areaY = 0;
  offset = 0;
  scrollMargin = 0;

  maintain = false;
  horizontal = false;

  getItem(i: number){
    return {
      index: i,
      offset: i * this.itemSize,
      size: this.itemSize
    };
  }

  getVisibleRange(){
    const {
      offset,
      overscan,
      itemSize,
      length,
      areaX
    } = this;

    if(!areaX)
      return [0,0] as const;

    const begin = offset - overscan;
    const skipped = Math.floor(begin / itemSize);
    const first = Math.min(length, Math.max(0, skipped));
    const rendered = Math.floor((areaX + overscan) / itemSize) + 1;
    const last = Math.max(0, Math.min(length - 1, first + rendered));

    return [first, last] as const;
  }
}

function observe(
  this: Virtual, element: HTMLElement | null){

  if(!element)
    return;

  let { maintain, DOM } = this;
  let scrollOffset = 0;

  const content = element.lastChild as HTMLDivElement;

  const getSize = () => {
    if(maintain)
      window.requestAnimationFrame(getSize);

    const outerRect = element.getBoundingClientRect();
    const innerRect = content.getBoundingClientRect();

    scrollOffset = outerRect.top - innerRect.top;

    this.scrollMargin = outerRect.width - innerRect.width;
    this.areaX = outerRect[DOM.sizeX];
    this.areaY = innerRect[DOM.sizeY];
  }

  const getOffset = () => {
    this.offset = element[DOM.scrollX] + scrollOffset;
  }

  getSize();
  getOffset();

  element.addEventListener("scroll", getOffset, {
    capture: false, passive: true
  });

  return () => {
    maintain = false;
    element.removeEventListener("scroll", getOffset);
  }
}

export default Virtual;
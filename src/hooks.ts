import { Children, ReactNode, RefObject, useLayoutEffect, useMemo, useState } from 'react';

export const usePadding = (
  children: ReactNode,
  ref: RefObject<HTMLElement>) => {

  const [ offset, setOffset ] = useState<number>();
  const { length } = Children.toArray(children);

  useLayoutEffect(() => {
    const element = ref!.current;

    if(element)
      setOffset(
        element.parentElement!.scrollWidth -
        element.scrollWidth
      )
  }, [length, ref.current]);

  return offset;
}

export const useGap = (gap: string | number) => {
  return useMemo(() => {
    if(!gap)
      return "1em";

    if(isNaN(gap as any))
      return gap;

    if(gap as number % 1 || gap < 10)
      return gap + "em";

    return gap + "px";
  }, [gap]);
}
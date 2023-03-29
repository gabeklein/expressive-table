import { FC, ReactNode, useLayoutEffect, useMemo } from 'react';

import { Grid } from './Grid';
import { Core } from './Core';

declare namespace Column {
  type Render = (
    this: Column.Info,
    row: any,
    rowIndex: number
  ) => ReactNode;

  type GetData = <T = any>(
    this: Column.Info,
    row: T
  ) => ReactNode;

  interface Info {
    readonly name: string;
    readonly index: number;
    readonly size: string;
  }

  interface Props {
    name?: string;
    size?: string | number;
    head?: FC<Core.HeadProps>;
    cell?: FC<Core.CellProps>;
    value?: string | GetData; 
    render?: Render;

    [rest: string]: any
  }
}

const Column: FC<Column.Props> = (props) => {
  let { cell, head, name, render, value } = props;

  const control = Grid.get();
  const column = useMemo(() => ({} as Grid.Column), []);

  if(value === undefined && name)
    value = name.toLowerCase();

  if(typeof value == "string"){
    if(!name)
      name = value
        .replace(/[A-Z][a-z]+/g, m => " " + m)
        .replace(/^[a-z]/, m => m.toUpperCase())
        .trim();

    const key = value;
    
    value = (data: any) => {
      if(typeof data == "object")
        return data[key];

      throw new Error(
        `Column "${name}" expects Table data but none is defined.`
      );
    }
  }

  const index = control.columns.length;

  if(!name)
    name = String(index);

  if(!render)
    render = value || ((_, row) => `${name} (${row})`);

  Object.assign(column, {
    name, index, render,
    value, head, cell, props
  })

  useLayoutEffect(() => {
    column.size = normalSize(props.size);
  }, [props.size]);

  useLayoutEffect(() => {
    const index = control.columns.push(column);
    
    control.set("columns");

    return () => {
      control.columns.splice(index, 1);
      control.set("columns");
    }
  }, []);

  return null;
}

function normalSize(size: string | number | undefined){
  if(size === undefined)
    return "minmax(0, 1fr)";

  if(typeof size == "string" && isNaN(+size))
    return size;

  return +size % 1
    ? `minmax(0, ${size}fr)`
    : `${size}px`;
}

export { Column };
import { FC, ReactNode, useLayoutEffect, useMemo } from 'react';

import Grid from './Grid';
import Table from './Table';

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
    head?: FC<Table.HeadProps>;
    cell?: FC<Table.CellProps>;
    value?: string | GetData; 
    render?: Render;

    [rest: string]: any
  }
}

const Column = (props: Column.Props) => {
  const control = Grid.get();
  const column = useMemo(() => ({} as Grid.Column<Grid>), []);

  let {
    cell,
    head,
    name,
    render,
    value
  } = props;

  const size = normalSize(props.size);

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
    name, size, index, render,
    value, head, cell, props
  })

  useLayoutEffect(() => {
    const index = control.columns.push(column);
    
    control.update("columns");

    return () => {
      control.columns.splice(index, 1);
      control.update("columns");
    }
  }, [])

  return false;
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

export default Column;
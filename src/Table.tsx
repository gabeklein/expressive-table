import Model, { get, has, Provider } from '@expressive/react';
import React, { FC, PropsWithChildren, ReactNode } from 'react';

declare namespace Grid {
  interface HeadProps {
    name: string;
    index: number;
    column: Column;
  }
  
  interface RowProps {
    index: number;
    row: number | { [key: string]: any };
    className: string;
  }
  
  interface CellProps {
    name: string;
    index: number;
    row: number | { [key: string]: any };
    column: Column;
  }
}

class Grid extends Model {
  columns = has(Column);

  template = get(this, ($): string => {
    return $.columns.map(x => x.size || "1.0fr").join(" ");
  })
}

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
}

class Column extends Model {
  name?: string;
  size?: string | number;
  head?: FC<Grid.HeadProps>;
  cell?: FC<Grid.CellProps>;
  value?: string | Column.GetData; 
  render?: Column.Render;
}

const Table = (props: PropsWithChildren<Model.Assign<Grid>>) => {
  return (
    <Provider for={Grid} set={props}>
      {props.children}
    </Provider>
  )
}

export { Table, Grid, Grid as default };
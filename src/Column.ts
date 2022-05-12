import { FC, ReactNode, useLayoutEffect } from 'react';

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

  useLayoutEffect(() => {
    control.register(props);
  }, []);

  return false;
}

export default Column;
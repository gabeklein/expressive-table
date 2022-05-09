import { FC, ReactChild, ReactFragment, ReactNode, ReactPortal } from 'react';

import Grid from './Grid';

type ReactContent = ReactChild | ReactFragment | ReactPortal;

declare namespace Table {
  interface Props <T = any> {
    data?: readonly T[];
    length?: number;
    didEnd?: () => void;
  
    header?: FC<HeaderProps>;
    head?: FC<HeadProps>;
    row?: FC<RowProps>;
    cell?: FC<CellProps>;
    empty?: FC<EmptyProps> | ReactContent;

    before?: ReactNode;
    after?: ReactNode;

    for?: Grid | typeof Grid;
    children: ReactNode;
    className?: string;
    style?: {};
  }

  interface EmptyProps<T extends Grid = any> {
    context: T;
  }

  interface HeaderProps<T extends Grid = any> {
    context: T;
    children: ReactNode;
  }

  interface HeadProps<T extends Grid = any> {
    context: T;
    index: number;
    column: Column.Props;
    children: ReactNode;
  }
  
  interface RowProps<T extends Grid = any> {
    data?: { [key: string]: any };
    className: string;
    children: ReactNode;
    context: T;
    offset: number;
    row: number;
  }
  
  interface CellProps<T extends Grid = any> {
    data?: { [key: string]: any };
    name: string;
    context: T;
    column: Column.Info;
    index: number;
    row: number;
  }
}

declare const Table: FC<Table.Props>;

declare namespace Column {
  type Render = (
    this: Column.Info,
    data: any,
    row: number
  ) => ReactNode;

  type GetData = <T = any>(
    this: Column.Info,
    data: T
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

declare const Column: FC<Column.Props>

export { Table, Column }
import { FC, ReactNode } from 'react';

import Grid, { Column } from './Grid';

declare namespace Table {
  interface Props <T = any> {
    header?: FC<HeaderProps>;
    head?: FC<HeadProps>;
    row?: FC<RowProps>;
    cell?: FC<CellProps>;
    empty?: FC<EmptyProps>;

    for?: Grid | typeof Grid;
    children: ReactNode;
    className?: string;
    style?: {};

    length?: number;
    end?: () => void;
  }

  interface EmptyProps<T extends Grid = any> {
    context: T;
  }

  interface HeaderProps<T extends Grid = any> {
    context: T;
  }

  interface HeadProps<T extends Grid = any> {
    context: T;
    column: Col.Props;
  }
  
  interface RowProps<T extends Grid = any> {
    className: string;
    children: ReactNode;
    context: T;
    offset: number;
    row: number;
    id: any;
  }
  
  interface CellProps<T extends Grid = any> {
    context: T;
    column: Col.Props;
    row: number;
    index: any;
  }
}

declare const Table: FC<Table.Props>;

declare namespace Col {
  type Render = (
    this: Column<any>,
    row: any,
    context: Grid
  ) => ReactNode;

  interface Props {
    name?: string;
    size?: string | number;
    head?: FC<Table.HeadProps>;
    cell?: FC<Table.CellProps>;
    render: Render;
  }
}

declare const Col: FC<Col.Props>

export { Table, Col }
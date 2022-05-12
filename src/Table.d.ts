import { CSSProperties, FC, ReactChild, ReactFragment, ReactNode, ReactPortal, VFC } from 'react';

import Column from './Column';
import Grid from './Grid';

type ReactContent = ReactChild | ReactFragment | ReactPortal;

declare namespace Table {
  interface Component extends FC<Table.Props> {
    Cell: FC<Table.CellProps>;
    Row: FC<Table.RowProps>;
    Head: FC<Table.HeadProps>;
    Header: FC<Table.HeaderProps>;
  }

  interface Props <T = any> {
    for?: Grid | typeof Grid;

    rows?: readonly T[];
    length?: number;
    didEnd?: () => void;
  
    header?: FC<HeaderProps>;
    head?: FC<HeadProps>;
    row?: FC<RowProps>;
    cell?: FC<CellProps>;
    empty?: VFC<EmptyProps> | ReactContent;

    before?: ReactNode;
    after?: ReactNode;
    children: ReactNode;
    className?: string;
    style?: {};
  }

  interface EmptyProps<T extends Grid = any> {
    context: T;
  }

  interface HeaderProps<T extends Grid = any> {
    context: T;
  }

  interface HeadProps<T extends Grid = any> {
    context: T;
    index: number;
    column: Column.Props;
    name: string;
    props: { [key: string]: any };
  }
  
  interface RowProps<T extends Grid = any> {
    context: T;
    index: number;
    row?: { [key: string]: any };
    offset: number;
    className: string;
    style: CSSProperties;
  }
  
  interface CellProps<T extends Grid = any> {
    context: T;
    index: number;
    row: number | { [key: string]: any };
    column: Column.Info;
    name: string;
    props: { [key: string]: any };
  }
}

declare const Table: Table.Component;

export default Table;
import { CSSProperties, FC, ReactChild, ReactFragment, ReactNode, ReactPortal } from 'react';

import Column from './Column';
import Grid from './Grid';

type ReactContent = ReactChild | ReactFragment | ReactPortal;

declare namespace Table {
  interface Props <T = any> {
    for?: Grid | typeof Grid;

    rows?: readonly T[];
    length?: number;
    didEnd?: () => void;
  
    header?: FC<HeaderProps>;
    head?: FC<HeadProps>;
    row?: FC<RowProps>;
    cell?: FC<CellProps>;
    empty?: FC<EmptyProps> | ReactContent;

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
    children: ReactNode;
  }

  interface HeadProps<T extends Grid = any> {
    context: T;
    index: number;
    column: Column.Props;
    children: ReactNode;
  }
  
  interface RowProps<T extends Grid = any> {
    context: T;
    index: number;
    row?: { [key: string]: any };
    offset: number;
    className: string;
    style: CSSProperties;
    children: ReactNode;
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

interface TableComponent extends FC<Table.Props> {
  Cell: FC<Table.CellProps>;
  Row: FC<Table.RowProps>;
  Head: FC<Table.HeadProps>;
  Header: FC<Table.HeaderProps>;
}

declare const Table: TableComponent;

export default Table;
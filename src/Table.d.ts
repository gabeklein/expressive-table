import {
  FC,
  ReactChild,
  ReactFragment,
  ReactNode,
  ReactPortal
} from 'react';

import Column from './Column';
import Grid from './Grid';

type ReactContent = ReactChild | ReactFragment | ReactPortal;

declare namespace Table {
  interface ControlProps <T = Grid> {
    for?: Grid | typeof Grid;
    rows?: readonly T[];
    length?: number;
    didEnd?: () => void;
    refresh?: boolean;
  }

  interface ComponentProps {
    header?: FC<HeaderProps>;
    head?: FC<HeadProps>;
    row?: FC<RowProps>;
    cell?: FC<CellProps>;
    empty?: FC<EmptyProps> | ReactContent;
    before?: ReactNode;
    after?: ReactNode;
  }

  interface Props <T = Grid>
    extends ControlProps<T>, ComponentProps {
      
    children: ReactNode;
    className?: string;
    style?: {};
  }

  interface EmptyProps<T extends Grid = Grid> {
    context: T;
  }

  interface HeaderProps<T extends Grid = Grid> {
    context: T;
  }

  interface HeadProps<T extends Grid = Grid> {
    context: T;
    index: number;
    column: Column.Props;
    name: string;
    props: { [key: string]: any };
  }
  
  interface RowProps<T extends Grid = Grid> {
    context: T;
    index: number;
    row?: { [key: string]: any };
    className: string;
  }
  
  interface CellProps<T extends Grid = Grid> {
    context: T;
    index: number;
    row: number | { [key: string]: any };
    column: Column.Info;
    name: string;
    props: { [key: string]: any };
  }

  interface Components {
    Cell: FC<CellProps>;
    Row: FC<RowProps>;
    Head: FC<HeadProps>;
    Header: FC<HeaderProps>;
  }
}

declare const Table: FC<Table.Props> & Table.Components;

export default Table;
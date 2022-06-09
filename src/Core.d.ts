import { FC } from 'react';

import Column from './Column';
import Grid from './Grid';

declare namespace Core {
  interface ControlProps <T = Grid> {
    for?: Grid | typeof Grid;
    rows?: T[];
    length?: number;
    didEnd?: () => void;
    refresh?: boolean;
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
}

declare const Core: FC<Core.ControlProps>;

export default Core;
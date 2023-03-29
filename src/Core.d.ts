import { FC } from 'react';

import { Column } from './Column';
import { Grid } from './Grid';

declare namespace Core {
  interface ControlProps <T = Grid> {
    for?: Grid | typeof Grid;
    rows?: T[];
    gap?: string | number;
    length?: number;
    didEnd?: () => void;
    refresh?: boolean;
  }

  interface HeadProps {
    index: number;
    column: Column.Props;
    name: string;
    props: { [key: string]: any };
  }
  
  interface RowProps {
    index: number;
    row?: { [key: string]: any };
    className: string;
  }
  
  interface CellProps {
    index: number;
    row: number | { [key: string]: any };
    column: Column.Info;
    name: string;
    props: { [key: string]: any };
  }
}

declare const Core: FC<Core.ControlProps>;

export { Core };
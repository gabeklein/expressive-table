import Model, { get } from '@expressive/mvc';
import { FC, ReactNode } from 'react';

import { Column } from './Column';
import { Core } from './Core';

declare namespace Grid {
  interface Column<T extends Grid> {
    head?: FC<Core.HeadProps<T>>;
    cell?: FC<Core.CellProps<T>>;
  
    size: string;
    name: string;
    index: number;

    props: { [key: string]: any }

    value?: string | ((this: Column.Info, data: any) => ReactNode);
  
    render: (this: Column.Info, data: any, row: number) => ReactNode;
  }
}

class Grid extends Model {
  rows?: any[] = [];
  length = 0;
  columns: Grid.Column<this>[] = [];

  didEnd?: () => void = undefined;

  constructor(){
    super();

    // TODO: remove
    this.on(({ rows }) => {
      if(rows)
        this.length = rows.length;
    });
  }

  template = get(this, ($): string => {
    return $.columns.map(x => x.size || "1.0fr").join(" ");
  })
}

export { Grid }
export default Grid;
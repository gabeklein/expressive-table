import Model, { from } from '@expressive/mvc';
import { FC, ReactNode } from 'react';

import Column from './Column';
import Table from './Table';

declare namespace Grid {
  interface Column<T extends Grid> {
    head?: FC<Table.HeadProps<T>>;
    cell?: FC<Table.CellProps<T>>;
  
    size: string;
    name: string;
    index: number;

    props: { [key: string]: any }

    value?: string | ((
      this: Column.Info,
      data: any
    ) => ReactNode)
  
    render: (
      this: Column.Info,
      data: any,
      row: number
    ) => ReactNode;
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
    this.effect(({ rows }) => {
      if(rows)
        this.length = rows.length;
    });
  }

  template: string = from(this, $ => {
    return $.columns.map(x => x.size || "1.0fr").join(" ")
  })
}

export { Grid }
export default Grid;
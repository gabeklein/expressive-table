import Model, { get, set } from '@expressive/react';
import { FC, ReactNode } from 'react';

import { Column } from './Column';

declare namespace Grid {
  interface Column {
    head?: FC;
    cell?: FC;
  
    size: string;
    name: string;
    index: number;

    props: { [key: string]: any }
    value?: string | ((this: Column.Info, data: any) => ReactNode);
    render: (this: Column.Info, data: any, row: number) => ReactNode;
  }
}

class Grid extends Model {
  rows = set([], ({ length }) => {
    this.length = length;
    return () => this.length = 0;
  });

  template = get(this, ({ columns }) => {
    return columns.map(x => x.size || "1.0fr").join(" ");
  })

  length = 0;
  columns: Grid.Column[] = [];

  didEnd?: () => void = undefined;

  constructor(){
    super();

    // TODO: remove
    this.get(({ rows }) => {
      if(rows)
        this.length = rows.length;
    });
  }
}

export { Grid }
export default Grid;
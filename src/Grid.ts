import Model, { from, ref, use } from '@expressive/mvc';
import { FC, ReactNode } from 'react';

import Column from './Column';
import Table from './Table';
import Virtual from './Virtual';

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
  virtual = use(Virtual);
  rows?: any[] = [];
  length = 0;
  padding = 0;
  ready = false;
  rowHeight = 40;
  columns: Grid.Column<this>[] = [];

  didEnd?: () => void = undefined;

  constructor(){
    super();

    this.on(key => {
      if(key == "length")
        this.virtual.length = this.length;

      else if(key == "rows" && this.rows)
        this.length = this.rows.length;
    });

    this.effect(({ didEnd, rowHeight, virtual }) => {
      virtual.itemSize = rowHeight;
      virtual.didEnd = didEnd;
    })
  }

  calibrate = ref(event => {
    if(event)
      this.padding =
        event.parentElement!.scrollWidth -
        event.scrollWidth
  })

  style = from(this, $ => {
    const template: string =
      $.columns.map(x => x.size || "1.0fr").join(" ");
    
    return {
      "--row-columns": template,
      "--row-height": $.rowHeight + "px",
    }
  })
}

export { Grid }
export default Grid;
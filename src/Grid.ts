import Model, { from, ref, set, use } from '@expressive/mvc';
import { FC, ReactNode } from 'react';

import { Column, Table } from './Table';
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

  data = set<[]>((): any => undefined, next => {
    if(next)
      this.length = next.length;
  });

  length = 0;
  padding = 0;
  ready = false;
  rowHeight = 40;
  columns: Grid.Column<this>[] = [];

  didEnd?: () => void = undefined;

  constructor(){
    super();

    this.effect(state => {
      const { length, rowHeight } = state;

      this.virtual.length = length;
      this.virtual.itemSize = rowHeight;
    });

    this.once("didMount", () => {
      this.ready = true;
      this.update("columns" as any);
      this.virtual.on("end", end => {
        if(end && this.didEnd)
          this.didEnd();  
      })
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

  register(props: Column.Props){
    const index = this.columns.length;
    let { size, render, value, name, head, cell } = props;

    switch(typeof size){
      case "undefined":
        size = "minmax(0, 1fr)";

      case "string":
        if(isNaN(+size))
          break;

      case "number":
        size = +size % 1 ? `minmax(0, ${size}fr)` : `${size}px`;
    }

    if(typeof value == "string"){
      const key = value;

      if(!name)
        name = value
          .replace(/[A-Z][a-z]+/g, m => " " + m)
          .replace(/^[a-z]/, m => m.toUpperCase())
          .trim();
      
      value = (data: any) => {
        if(typeof data == "object")
          return data[key];

        throw new Error(
          `Column "${name}" expects Table data but none is defined.`
        );
      }
    }

    if(!render)
      render = value || ((_, row) => `${name} (${row})`);

    if(!name)
      name = String(index);
  
    this.columns.push({
      name,
      size,
      index,
      render,
      value,
      head,
      cell,
      props
    });
  }
}

export { Grid }
export default Grid;
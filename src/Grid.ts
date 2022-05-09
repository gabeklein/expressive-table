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
  
    render: (
      index: number,
      context: Grid,
      column: Column.Info
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

    switch(typeof value){
      case "function": {
        const set = value;

        render = (row: number) => set(
          this.data ? this.data[row] : row, row
        );

        break;
      }

      case "string": {
        const key = value;

        if(!name)
          name = value
            .replace(/[A-Z][a-z]+/g, m => " " + m)
            .replace(/^[a-z]/, m => m.toUpperCase())
            .trim();
        
        render = (row: number) => {
          if(!this.data)
            throw new Error(
              `Column "${name}" expects Table data but none is defined.`
            );

          return this.data[row][key];
        }
        break;
      }

      default: {
        render = (row: number) => {
          if(this.data){
            const data = this.data[row];
            
            if(data && name! in data)
              return data[name!];
          }
      
          return `${name} (${row})`;
        }
      }
    }

    if(!name)
      name = String(index);
  
    this.columns.push({
      name,
      size,
      index,
      render,
      head,
      cell,
      props
    });
  }
}

export { Grid }
export default Grid;
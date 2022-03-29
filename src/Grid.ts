import Model, { from, ref, use } from '@expressive/mvc';
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
  
    render?: (
      index: number,
      context: Grid,
      column: Column.Info
    ) => ReactNode;
  }
}

class Grid extends Model {
  virtual = use(Virtual);

  length = 0;
  rowHeight = 40;
  data = [];

  ready = false;
  padding = 0;
  columns: Grid.Column<this>[] = [];

  header = undefined;
  head = undefined;
  cell = undefined;
  row = undefined;

  render = (row: number, column: Grid.Column<this>) => {
    const { name } = column;

    if(this.data){
      const data = this.data[row];
      
      if(data && name in data)
        return data[name];
    }

    return `${name} (${row})`;
  };

  didEnd?: () => void = undefined;

  constructor(){
    super();

    this.effect(state => {
      const {
        data,
        length,
        rowHeight,
        virtual
      } = state;

      if(data)
        virtual.length = data.length;

      virtual.length = length;
      virtual.itemSize = rowHeight;
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
    const { data, columns } = this;
    const index = columns.length;
    let { size, render, value, name } = props;

    switch(typeof size){
      case "undefined":
        size = "1fr";

      case "string":
        if(isNaN(+size))
          break;

      case "number":
        size = `${size}${+size % 1 ? "fr" : "px"}`;
    }

    switch(typeof value){
      case "function": {
        const set = value;

        render = (row: number) =>
          set(data ? data[row] : row, row)

        break;
      }

      case "string": {
        if(!name)
          name = value;
        
        if(!data)
          throw new Error(
            `Column "${name}" expects Table data but none is defined.`
          );

        const key = value;
        render = (row: number) => data[row][key];
      }
    }
  
    columns.push({
      name: name || String(index),
      size,
      index,
      render,
      head: props.head,
      cell: props.cell
    });
  }
}

export { Grid }
export default Grid;
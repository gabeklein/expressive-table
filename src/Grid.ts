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
  
    render: (
      index: number,
      context: Grid,
      column: Column.Info
    ) => ReactNode;
  }
}

class Grid extends Model {
  virtual = use(Virtual);

  data = [];
  length = 0;
  padding = 0;
  ready = false;
  rowHeight = 40;
  columns: Grid.Column<this>[] = [];

  header = undefined;
  head = undefined;
  row = undefined;
  cell = undefined;

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

      if(data){
        // TODO: squash recursive update
        virtual.length = state.length = data.length;
      }

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
    const index = this.columns.length;
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

        render = (row: number) => set(
          this.data ? this.data[row] : row, row
        );

        break;
      }

      case "string": {
        const key = value;

        if(!name)
          name = value;
        
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
      head: props.head,
      cell: props.cell
    });
  }
}

export { Grid }
export default Grid;
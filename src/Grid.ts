import { from } from '@expressive/mvc';
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

class Grid extends Virtual {
  length = 0;
  data = [];

  height = 40;
  columns: Grid.Column<this>[] = [];

  constructor(){
    super();

    this.on("data", data => {
      if(data)
        this.length = data.length;
    })
  }

  style = from(this, $ => {
    const template: string =
      $.columns.map(x => x.size || "1.0fr").join(" ");
    
    return {
      "--row-columns": template,
      "--row-height": $.height + "px",
    }
  })

  register = (props: Column.Props) => {
    const index = this.columns.length;
    const { data } = this;
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

        const get = data
          ? (row: number) => data[row]
          : (row: number) => row;

        render = (row: number) => set(get(row), row);
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
  
    this.columns.push({
      name: name || String(index),
      size,
      index,
      render,
      head: props.head,
      cell: props.cell
    });
  }

  componentDidMount(){
    this.update("columns" as any);
  }

  render(row: number, column: Grid.Column<this>){
    const { name } = column;

    if(this.data){
      const data = this.data[row];
      
      if(data && name in data)
        return data[name];
    }

    return `${name} (${row})`;
  };
}

export { Grid }
export default Grid;
import { FC, ReactNode, useLayoutEffect } from 'react';

import { Column, Table } from './Table';
import Virtual from './Virtual';

export class Grid extends Virtual {
  vars = {};
  length = 0;
  height = 40;
  columns: DataType<this>[] = [];

  componentDidMount(){
    const { columns, height } = this;
    const template: string =
      columns.map(x => x.size || "1.0fr").join(" ");
    
    this.vars = {
      "--row-columns": template,
      "--row-height": height + "px",
    }
  }

  render(row: any, column: DataType<this>, _context: this): ReactNode {
    return `${column.name} (${row})`;
  };
}

export class DataType<T extends Grid> {
  head?: FC<Table.HeadProps<T>>;
  cell?: FC<Table.CellProps<T>>;

  public size = "1fr";
  public name = "";

  constructor(info: Column.Props, index: number){
    let { name, size } = info;

    if(!name)
      name = `Column ${index + 1}`;

    if(typeof size == "number")
      size = size + "px";

    Object.assign(this, {
      name,
      size,
      render: info.render,
      head: info.head,
      cell: info.cell
    });
  }

  public render?: (row: number) => ReactNode;
}

export default Grid;
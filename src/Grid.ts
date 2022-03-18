import { FC, ReactNode } from 'react';

import { Table } from './Table';
import Virtual from './Virtual';

declare namespace Grid {
  interface Column<T extends Grid> {
    head?: FC<Table.HeadProps<T>>;
    cell?: FC<Table.CellProps<T>>;
  
    size: string;
    name: string;
  
    render?: (row: number) => ReactNode;
  }
}

class Grid extends Virtual {
  vars = {};
  length = 0;
  height = 40;
  columns: Grid.Column<this>[] = [];

  componentDidMount(){
    const { columns, height } = this;
    const template: string =
      columns.map(x => x.size || "1.0fr").join(" ");
    
    this.vars = {
      "--row-columns": template,
      "--row-height": height + "px",
    }
  }

  render(row: any, column: Grid.Column<this>){
    return `${column.name} (${row})`;
  };
}


export { Grid }
export default Grid;
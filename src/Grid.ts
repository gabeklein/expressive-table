import { on } from '@expressive/mvc';
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
  length = 0;
  data = on<readonly any[]>(undefined, data => {
    this.length = data.length;
  })

  style = {};
  height = 40;
  columns: Grid.Column<this>[] = [];

  componentDidMount(){
    const { columns, height } = this;
    const template: string =
      columns.map(x => x.size || "1.0fr").join(" ");
    
    this.style = {
      "--row-columns": template,
      "--row-height": height + "px",
    }
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
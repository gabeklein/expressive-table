import { FC, ReactNode, useLayoutEffect } from 'react';

import { Column, Table } from './Table';
import Virtual from './Virtual';

export class Grid extends Virtual {
  ready = false;
  vars = {};
  length = 0;
  height = 40;
  columns: DataType<this>[] = [];

  Header?: FC<Table.HeaderProps<this>> = undefined;
  Head?: FC<Table.HeadProps<this>> = undefined;
  Cell?: FC<Table.CellProps<this>> = undefined;
  Row?: FC<Table.RowProps<this>> = undefined;
  Empty?: FC<Table.EmptyProps<this>> = undefined;

  componentDidMount(){
    const { columns, height } = this;
    const template: string =
      columns.map(x => x.size || "1.0fr").join(" ");
    
    this.ready = true;
    this.vars = {
      "--row-columns": template,
      "--row-height": height + "px",
    }
  }

  render(row: any, column: DataType<this>, _context: this): ReactNode {
    return `${column.name} (${row})`;
  };

  useProps(props: Table.Props){
    const { end, length } = props;

    if(length !== undefined)
      this.length = length;

    useLayoutEffect(() => {
      return end && this.effect(x => {
        x.end && end();          
      });
    }, [end]);
    
    if(props.header)
      this.Header = props.header;
    if(props.head)
      this.Head = props.head;
    if(props.cell)
      this.Cell = props.cell;
    if(props.row)
      this.Row = props.row;
    if(props.empty)
      this.Empty = props.empty;
  }
}

export class DataType<T extends Grid> {
  Head?: FC<Table.HeadProps<T>>;
  Cell?: FC<Table.CellProps<T>>;

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
      Head: info.head,
      Cell: info.cell
    });
  }

  public render?: (row: number) => ReactNode;
}

export default Grid;
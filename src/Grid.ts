import { from } from '@expressive/mvc';
import { Children, FC, Fragment, isValidElement, ReactNode, useLayoutEffect } from 'react';

import { Col, Table } from './Table';
import Virtual from './Virtual';

export class Grid extends Virtual {
  length = 0;
  height = 40;
  columns: Column<this>[] = [];

  Header?: FC<Table.HeaderProps<this>> = undefined;
  Head?: FC<Table.HeadProps<this>> = undefined;
  Cell?: FC<Table.CellProps<this>> = undefined;
  Row?: FC<Table.RowProps<this>> = undefined;
  Empty?: FC<Table.EmptyProps<this>> = undefined;

  readonly css = from(this, state => {
    const { columns, height } = state;

    const template: string =
      columns.map(x => x.size || "1.0fr").join(" ");
      
    return {
      "--row-columns": template,
      "--row-height": height + "px",
    }
  })

  render(row: any, column: Column<this>, _context: this): ReactNode {
    return `${column.name} (${row})`;
  };

  useProps(props: Table.Props){
    const { end, length } = props;
    const keys = Children
      .toArray(props.children)
      .map((x: any) => x.props.name)
      .join(",");

    if(length !== undefined){
      console.log(`Length is ${length}`)
      this.length = length;
    }

    useLayoutEffect(() => {
      if(end)
        return this.effect(x => x.end && end());
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
    
    useLayoutEffect(() => {
      this.columns = [];
      this.extractColumns(props.children);
    }, [keys]);
  }

  extractColumns(children: any){
    Children.forEach(children, (element, index) => {
      if(!isValidElement(element))
        return;
  
      const { type, props } = element as any;
  
      if(type === Fragment){
        this.extractColumns(props.children)
        return;
      }
  
      if(type !== Col){
        const name = typeof element.type === "string"
          ? element.type : element.type.name;
  
        throw `${name} is not a <Column>`;
      }
  
      this.columns.push(
        new Column(props, index)
      );
    })
  }
}

export class Column<T extends Grid> {
  Head?: FC<Table.HeadProps<T>>;
  Cell?: FC<Table.CellProps<T>>;

  public size = "1fr";
  public name = "";

  constructor(info: Col.Props, index: number){
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
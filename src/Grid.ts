import Model, { get, set, use } from '@expressive/react';
import { Children, cloneElement, createElement, Fragment, isValidElement } from 'react';

import { Body } from './Body';
import { DefaultCell, DefaultHead, DefaultHeader, DefaultRow } from './Defaults';
import { Virtual } from './Virtual';

declare namespace Grid {
  interface BodyProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }

  interface RowProps {
    index: number;
    data: { [key: string]: any };
  }

  interface HeadProps {
    column: Column;
    children?: React.ReactNode;
  }

  interface CellProps {
    column: Column;
    data: { [key: string]: any };
    children?: React.ReactNode;
  }
}

class Grid extends Model {
  virtual = use(Virtual);

  Body: React.FC<Grid.BodyProps> = Body;
  Row: React.FC<Grid.RowProps> = DefaultRow;
  Cell: React.FC<Grid.CellProps> = DefaultCell;
  Head: React.FC<Grid.HeadProps> = DefaultHead;
  Header: React.FC = DefaultHeader;

  columns = [] as Column[];
  data = [];

  render(props: Grid.BodyProps) {
    const { Body } = this;
    const { children, ...rest } = props;

    this.columns = [];

    return createElement(Fragment, null,
      Children.map(children, (child) => (
        isValidElement(child) && child.key == null
          ? cloneElement(child, { key: child.props.id || child.props.name })
          : child
      )),
      createElement(Body, rest)
    );
  }
}

class Column extends Model {
  table = get(Grid);
  id = set(() => this.name.toLowerCase());

  name: string = "";
  className = "";
  size?: string | number = 1;
  index: number = -1;

  Cell = undefined;
  Head = undefined;

  head() {
    return this.name;
  }

  cell(row: Record<string, any>) {
    return row[this.id];
  }

  render(){
    this.index = this.table.columns.push(this) - 1;
    return null;
  }
}

export { Grid, Column };
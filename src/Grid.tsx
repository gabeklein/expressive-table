import Model, { get, set } from '@expressive/react';
import { Children, cloneElement, Fragment, isValidElement, memo } from 'react';

import { DefaultBody, DefaultCell, DefaultHead, DefaultHeader, DefaultRow } from './defaults';

declare namespace Grid {
  interface BodyProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }

  interface RowProps<T = any> {
    index: number;
    data: T;
    className?: string;
    children?: React.ReactNode;
  }

  interface HeaderProps {
    children?: React.ReactNode;
    className?: string;
  }

  interface HeadProps {
    column: Column;
    children?: React.ReactNode;
    index: number;
  }

  interface CellProps<T = any> {
    column: Column;
    data: T;
    children?: React.ReactNode;
    className?: string;
    index: number;
  }
}

class Grid<T extends { [key: string]: any } = any> extends Model {
  static Body: React.FC<Grid.BodyProps> = DefaultBody;
  static Row: React.FC<Grid.RowProps> = DefaultRow;
  static Cell: React.FC<Grid.CellProps> = DefaultCell;
  static Head: React.FC<Grid.HeadProps> = DefaultHead;
  static Header: React.FC<Grid.HeaderProps> = DefaultHeader;

  Body: React.FC<Grid.BodyProps> = type(this).Body;
  Row: React.FC<Grid.RowProps<T>> = type(this).Row;
  Cell: React.FC<Grid.CellProps<T>> = type(this).Cell;
  Header: React.FC<Grid.HeaderProps> = type(this).Header;
  Head: React.FC<Grid.HeadProps> = type(this).Head;

  data = [] as T[];
  columns = [] as Column[];

  template = get(this, ({ columns }) => (
    columns.map(({ size }) => (
      typeof size == 'string' ? size : `${size || 1}fr`
    ))
  ));

  render(props: Grid.BodyProps) {
    const { Body } = this;
    const { children, ...rest } = props;

    if (children)
      this.columns = [];

    return (
      <Fragment>
        {Children.map(children, setKey)}
        <Body {...rest} />
      </Fragment>
    )
  }
}

function type(model: Grid) {
  return model.constructor as typeof Grid;
}

function setKey(child: React.ReactNode){
  return isValidElement(child) && child.key == null
    ? cloneElement(child, { key: child.props.id || child.props.name })
    : child
}

class Column extends Model {
  grid = get(Grid);
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
    this.index = this.grid.columns.push(this) - 1;
    return null;
  }
}

const Header = (props: { className: string }) => {
  const { columns, Header, Head: Default } = Grid.get();

  return (
    <Header {...props}>
      {columns.map(({ is: column, id, Head = Default }, i) =>
        <Head key={id} column={column} index={i}>
          {column.head()}
        </Head>
      )}
    </Header>
  )
}

const Row = memo((props: Grid.RowProps) => {
  const { columns, Row, Cell: Default } = Grid.get();
  const { data } = props;

  return (
    <Row {...props} key={data.id}>
      {columns.map(({ Cell = Default, id, className, is: column }, i) =>
        <Cell key={id} className={className} data={data} column={column} index={i}>
          {column.cell(data)}
        </Cell>
      )}
    </Row>
  )
})

export { Grid, Column, Header, Row };
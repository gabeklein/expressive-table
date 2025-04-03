import Model, { get, set } from '@expressive/react';
import { Children, cloneElement, Fragment, isValidElement, memo, ReactNode } from 'react';

declare namespace Grid {
  interface Props {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }

  interface BodyProps {
    header?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
  }

  interface RowProps<T = any> {
    data: T;
    i: number | string;
    children?: React.ReactNode;
  }

  interface HeaderProps {
    children?: React.ReactNode;
  }

  interface HeadProps {
    column: Column;
    children?: React.ReactNode;
  }

  interface CellProps<T = any> {
    column: Column;
    data: T;
    children?: React.ReactNode;
    className?: string;
  }
}

class Grid<T = any> extends Model {
  static Body: React.FC<Grid.BodyProps> = Noop;
  static Row: React.FC<Grid.RowProps> = Noop;
  static Cell: React.FC<Grid.CellProps> = Noop;
  static Head: React.FC<Grid.HeadProps> = Noop;
  static Header: React.FC<Grid.HeaderProps> = Noop;

  Body: React.FC<Grid.BodyProps> = type(this).Body;
  Row: React.FC<Grid.RowProps<T>> = type(this).Row;
  Cell: React.FC<Grid.CellProps<T>> = type(this).Cell;
  Header: React.FC<Grid.HeaderProps> = type(this).Header;
  Head: React.FC<Grid.HeadProps> = type(this).Head;

  data = [] as T[];
  rows = get(this, $ => $.data.map((_, i) => i));

  columns = [] as Column<T>[];

  key(index: number): string | number {
    return index;
  }

  row(key: string | number){
    return key as unknown as T;
  }

  cell(row: T, column: Column): ReactNode {
    return null;
  }

  render(props: Grid.Props) {
    const { Body } = this;
    const { children, className, style } = props;

    if (children)
      this.columns = [];

    return (
      <Fragment>
        {Children.map(children, setKey)}
        <Body style={style} className={className} header={<IHeader />}>
          <IRows />
        </Body>
      </Fragment>
    )
  }
}

class Column<T = any> extends Model {
  grid = get(Grid) as Grid<T>;
  id = set(() => this.name.toLowerCase());

  name: string = "";
  className = "";
  size?: string | number = 1;
  index: number = -1;

  Cell = undefined;
  Head = undefined;

  children?: (row: T) => ReactNode = undefined;

  head() {
    return this.name;
  }

  render(){
    this.index = this.grid.columns.push(this) - 1;
    return null;
  }
}

function Noop() {
  return null;
}

function type(model: Grid) {
  return model.constructor as typeof Grid;
}

function setKey(child: React.ReactNode){
  return isValidElement(child) && child.key == null
    ? cloneElement(child, { key: child.props.id || child.props.name })
    : child
}

/** Internal Header */
function IHeader() {
  const { columns, Header, Head: Default } = Grid.get();

  return (
    <Header>
      {columns.map(({ is: column, id, Head = Default }) => (
        <Head key={id} column={column}>
          {column.head()}
        </Head>
      ))}
    </Header>
  );
}

/** Internal Rows */
function IRows() {
  const { rows, key } = Grid.get();

  return rows.map(key).map((i) => (
    <IRow i={i} key={i} />
  ));
}

/** Internal Row */
const IRow = memo((props: { i: number | string }) => {
  const { cell: defaultCell, Cell: DefaultCell, columns, row, Row } = Grid.get();
  const data = row(props.i);

  return (
    <Row {...props} data={data}>
      {columns.map(({ Cell = DefaultCell, children = defaultCell, className, id, is }) =>
        <Cell className={className} column={is} data={data} key={id}>
          {children(data, is)}
        </Cell>
      )}
    </Row>
  )
})

export { Grid, Column };
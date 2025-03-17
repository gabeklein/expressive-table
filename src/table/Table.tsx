import { Grid } from '../Grid';
import { Body, Cell, Head, Header, Row } from './Body';

class Table<T = any> extends Grid<T> {
  static Body: React.FC<Grid.BodyProps> = Body;
  static Row: React.FC<Grid.RowProps> = Row;
  static Cell: React.FC<Grid.CellProps> = Cell;
  static Head: React.FC<Grid.HeadProps> = Head;
  static Header: React.FC<Grid.HeaderProps> = Header;
}

export { Table };
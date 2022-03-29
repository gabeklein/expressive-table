import Model from "@expressive/mvc";
import { FC, ReactNode } from "react";

declare class Virtual extends Model {
  container: Model.Ref<HTMLElement | null>;
  length: number;
  itemSize: number;
  overscan: number;
  size: number;
  range: readonly [number, number];
  areaX: number;
  areaY: number;
  scrollMargin: number;
  offset: number;
  maintain: boolean;
  horizontal: boolean;
  end: boolean;
  slice: ReturnType<this["getItem"]>[];
  DOM: Readonly<{
    readonly sizeX: "height";
    readonly sizeY: "width";
    readonly fromX: "top";
    readonly fromY: "left";
    readonly scrollX: "scrollTop";
  }>;

  getVisibleRange(): readonly [number, number];
  observeContainer(element: HTMLElement | null): (() => void) | undefined;
  getItem(i: number): {
    key: number;
    index: number;
    offset: number;
    size: number;
  };
}

declare namespace Grid {
  interface Column<T extends Grid> {
    head?: FC<Table.HeadProps<T>>;
    cell?: FC<Table.CellProps<T>>;
  
    size: string;
    name: string;
    index: number;
  
    render: (
      index: number,
      context: Grid,
      column: Column.Info
    ) => ReactNode;
  }
}

declare class Grid extends Model {
  virtual: Virtual;
  ready: boolean;

  data?: [];
  length: number;
  rowHeight: number;
  columns: Grid.Column<this>[];

  header?: FC<Table.HeaderProps>;
  head?: FC<Table.HeadProps>;
  row?: FC<Table.RowProps>;
  cell?: FC<Table.CellProps>;

  didEnd?: () => void;

  readonly style: {
    "--row-columns": string;
    "--row-height": string;
  };

  render(row: any, column: Grid.Column<this>, context: this): ReactNode;
}

declare namespace Table {
  interface Props <T = any> {
    for?: Grid | typeof Grid;
    data?: readonly T[];
    length?: number;

    header?: FC<HeaderProps>;
    head?: FC<HeadProps>;
    row?: FC<RowProps>;
    cell?: FC<CellProps>;
    empty?: FC<EmptyProps>;

    className?: string;
    style?: {};
    children: ReactNode;

    didEnd?: () => void;
  }

  interface EmptyProps<T extends Grid = any> {
    context: T;
  }

  interface HeaderProps<T extends Grid = any> {
    context: T;
    children: ReactNode;
  }

  interface HeadProps<T extends Grid = any> {
    context: T;
    column: Column.Props;
    index: number;
    children: ReactNode;
  }
  
  interface RowProps<T extends Grid = any> {
    data?: { [key: string]: any };
    className: string;
    children: ReactNode;
    context: T;
    offset: number;
    row: number;
  }
  
  interface CellProps<T extends Grid = any> {
    name: string;
    data?: { [key: string]: any };
    context: T;
    column: Column.Info;
    index: number;
    row: number;
  }
}

declare const Table: FC<Table.Props>;

declare namespace Column {
  type Render = (
    index: any,
    context: Grid,
    column: Column.Info
  ) => ReactNode

  type GetData = <T = any>(
    data: T,
    index: number
  ) => ReactNode;

  interface Info {
    readonly name: string;
    readonly index: number;
    readonly size: string;
  }

  interface Props {
    name?: string;
    size?: string | number;
    head?: FC<Table.HeadProps>;
    cell?: FC<Table.CellProps>;
    value?: string | GetData; 
    render?: Render;
  }
}

declare const Column: FC<Column.Props>
declare const Cell: FC<Table.CellProps>;
declare const Row: FC<Table.RowProps>;

export {
  Table as default,
  Column,
  Grid,
  Cell,
  Row
};
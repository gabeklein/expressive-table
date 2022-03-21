import Model from "@expressive/mvc";
import { FC, ReactNode } from "react";

export { Table as default, Column, Grid };

declare class Virtual extends Model {
  container: Model.Ref<HTMLElement | null>;
  length: number;
  itemSize: number;
  overscan: number;
  size: number;
  range: readonly [number, number];
  slice: ReturnType<this["getItem"]>[];
  DOM: Readonly<{
    readonly sizeX: "height";
    readonly sizeY: "width";
    readonly fromX: "top";
    readonly fromY: "left";
    readonly scrollX: "scrollTop";
  }>;
  areaX: number;
  areaY: number;
  scrollMargin: number;
  offset: number;
  maintain: boolean;
  horizontal: boolean;
  end: boolean;
  getItem(i: number): {
    key: number;
    index: number;
    offset: number;
    size: number;
  };
  getVisibleRange(): readonly [number, number];
  observeContainer(element: HTMLElement | null): (() => void) | undefined;
}

declare namespace Grid {
  interface Column<T extends Grid> {
    head?: FC<Table.HeadProps<T>>;
    cell?: FC<Table.CellProps<T>>;
  
    size: string;
    name: string;
  
    render?: (row: number) => ReactNode;
  }
}

declare class Grid extends Virtual {
  length: number;
  height: number;
  columns: Grid.Column<this>[];

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
    children: ReactNode;
  }
  
  interface RowProps<T extends Grid = any> {
    data?: { [key: string]: any };
    className: string;
    children: ReactNode;
    context: T;
    offset: number;
    row: number;
    id: any;
  }
  
  interface CellProps<T extends Grid = any> {
    data?: { [key: string]: any };
    name: string;
    context: T;
    column: Column.Props;
    row: number;
    index: any;
  }
}

declare const Table: FC<Table.Props>;

declare namespace Column {
    type Render = (
      this: Grid.Column<any>,
      row: any,
      context: Grid
    ) => ReactNode;

    interface Props {
      name?: string;
      size?: string | number;
      head?: FC<Table.HeadProps>;
      cell?: FC<Table.CellProps>;
      render: Render;
    }
}

declare const Column: FC<Column.Props>
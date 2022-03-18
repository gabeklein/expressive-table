import Model from "@expressive/mvc";
import { FC, ReactNode } from "react";

export { Table as default, Col, Grid };

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

declare class Grid extends Virtual {
  length: number;
  height: number;
  columns: Column<this>[];
  Header?: FC<Table.HeaderProps<this>>;
  Head?: FC<Table.HeadProps<this>>;
  Cell?: FC<Table.CellProps<this>>;
  Row?: FC<Table.RowProps<this>>;
  Empty?: FC<Table.EmptyProps<this>>;
  readonly css: {
    "--row-columns": string;
    "--row-height": string;
  };
  render(row: any, column: Column<this>, _context: this): ReactNode;
  extractColumns(children: any): void;
}

declare class Column<T extends Grid> {
    Head?: FC<Table.HeadProps<T>>;
    Cell?: FC<Table.CellProps<T>>;
    size: string;
    name: string;
    constructor(info: Col.Props, index: number);
    render?: (row: number) => ReactNode;
}

declare namespace Table {
  interface Props <T = any> {
    header?: FC<HeaderProps>;
    head?: FC<HeadProps>;
    row?: FC<RowProps>;
    cell?: FC<CellProps>;
    empty?: FC<EmptyProps>;

    for?: Grid | typeof Grid;
    children: ReactNode;
    className?: string;
    style?: {};

    length?: number;
    end?: () => void;
  }

  interface EmptyProps<T extends Grid = any> {
    context: T;
  }

  interface HeaderProps<T extends Grid = any> {
    context: T;
  }

  interface HeadProps<T extends Grid = any> {
    context: T;
    column: Col.Props;
  }
  
  interface RowProps<T extends Grid = any> {
    className: string;
    children: ReactNode;
    context: T;
    offset: number;
    row: number;
    id: any;
  }
  
  interface CellProps<T extends Grid = any> {
    context: T;
    column: Col.Props;
    row: number;
    index: any;
  }
}

declare const Table: FC<Table.Props>;

declare namespace Col {
    type Render = (
      this: Column<any>,
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

declare const Col: FC<Col.Props>
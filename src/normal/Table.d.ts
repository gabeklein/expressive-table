import { FC, ReactNode } from "react";
import { Core } from "../Core";
import { Grid } from "../Grid";

declare namespace Table {
  interface ComponentProps {
    header?: FC;
    head?: FC<Core.HeadProps>;
    row?: FC<Core.RowProps>;
    cell?: FC<Core.CellProps>;
    empty?: FC | ReactNode;
    before?: ReactNode;
    after?: ReactNode;
    fallback?: ReactNode;
  }

  interface Props <T = Grid>
    extends Core.ControlProps<T>, ComponentProps {

    children: ReactNode;
    className?: string;
    style?: {};
  }
}

declare const Table: FC<Table.Props>;

export { Table };
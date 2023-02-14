import { FC, ReactNode } from "react";
import { Core } from "../Core";
import { Grid } from "../Grid";

declare namespace Table {
  interface ComponentProps {
    header?: FC<Core.HeaderProps>;
    head?: FC<Core.HeadProps>;
    row?: FC<Core.RowProps>;
    cell?: FC<Core.CellProps>;
    empty?: FC<Core.EmptyProps> | ReactNode;
    before?: ReactNode;
    after?: ReactNode;
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
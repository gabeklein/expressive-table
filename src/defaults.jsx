import { Grid } from "./Grid";

/** @type React.FC<Grid.BodyProps> */
export const Body = ({ header, children }) => {
  <table this>
    {header}
    <tbody>
      {children}
    </tbody>
  </table>
};

/** @type React.FC<Grid.HeaderProps> */
export const Header = () => {
  backgroundColor: 0xf3f4f6;
  zIndex: 1;
  position: sticky;
  top: 0;

  <thead this />
}

/** @type React.FC<Grid.HeadProps> */
export const Head = ({ column }) => {
  padding: '16px';
  textAlign: 'left';
  fontWeight: 500;
  color: 0x4b5563;
  borderBottom: 0xe5e7eb;

  <th this />
}

/** @type React.FC<Grid.RowProps> */
export const Row = ({ data }) => {
  borderBottom: 0xe5e7eb;
  backgroundColor: 0xffffff;
  transition: 'background-color 0.2s';

  if(":hover")
    backgroundColor: 0xf9fafb;

  <tr this />
}

/** @type React.FC<Grid.CellProps> */
export const Cell = ({ data }) => {
  padding: 16;
  color: 0x4b5563;

  <td this />
}
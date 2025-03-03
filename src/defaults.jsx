import { Grid } from "./Grid";

/** @type React.FC */
export const DefaultHeader = () => {
  backgroundColor: 0xf3f4f6;
  zIndex: 10;
  position: sticky;
  top: 0;
}

/** @type React.FC<Grid.HeadProps> */
export const DefaultHead = ({ column }) => {
  padding: '16px';
  textAlign: 'left';
  fontWeight: 500;
  color: 0x4b5563;
  borderBottom: 0xe5e7eb;
}

/** @type React.FC */
export const DefaultRow = () => {
  borderBottom: 0xe5e7eb;
  backgroundColor: 0xffffff;
  transition: 'background-color 0.2s';

  if(":hover")
    backgroundColor: 0xf9fafb;
}

/** @type React.FC<Grid.CellProps> */
export const DefaultCell = () => {
  padding: 16;
  color: 0x4b5563;
}
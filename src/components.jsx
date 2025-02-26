import { ITable } from "./Control";

/** @type React.FC */
export const DefaultHeader = () => {
  backgroundColor: '#f3f4f6';
  zIndex: 10;
  position: sticky;
  top: 0;
}

/** @type React.FC<ITable.HeadProps> */
export const DefaultHead = ({ column }) => {
  padding: '16px';
  textAlign: 'left';
  fontWeight: 500;
  color: '#4b5563';
  borderBottom: 0xe5e7eb;

  <this>
    {column.name}
  </this>
}

/** @type React.FC */
export const DefaultRow = () => {
  borderBottom: '1px solid #e5e7eb';
  backgroundColor: '#ffffff';
  transition: 'background-color 0.2s';

  if(":hover")
    backgroundColor: '#f9fafb';

  <this />
}

/** @type React.FC<ITable.CellProps> */
export const DefaultCell = ({ column, data }) => {
  padding: '16px';
  color: '#4b5563';

  <this>
    {data[column.id]}
  </this>
}
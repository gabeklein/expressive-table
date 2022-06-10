import Core from '../Core';
import Body from './Body';

export const Table = (props) => {
  const { children, ...rest } = props;

  <Core {...rest}>
    {children}
    <Body
      cell={Cell}
      row={Row}
      {...rest} 
    />
  </Core>
}

const Row = ({ children, offset }) => {
  forward: className;

  <this style={{ top: offset }}>
    {children}
  </this>
}

const Cell = ({ children }) => {
  forward: className;
  fontSize: 0.9;
  overflow: hidden;
  textOverflow: ellipsis;
  whiteSpace: nowrap;

  <this>
    {children}
  </this>
}

export default Table;
import Core from '../Core';
import Body from './Body';

export const Table = (props) => {
  const { children, ...rest } = props;

  <Core {...rest}>
    {children}
    <Body
      row={Row}
      {...rest} 
    />
  </Core>
}

const Row = ({ children }) => {
  forward: className;
  minHeight: 2.5;

  <this>
    {children}
  </this>
}

export default Table;
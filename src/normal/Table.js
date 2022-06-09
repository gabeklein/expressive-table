import Core from '../Core';
import Body from './Body';

export const Table = (props) => {
  const { children, ...rest } = props;

  <Core {...rest}>
    {children}
    <Body
      header={Header}
      cell={Cell}
      row={Row}
      {...rest} 
    />
  </Core>
}

const Header = (props) => {
  forward: className;

  <this>
    {props.children}
  </this>
}

const Row = (props) => {
  forward: className;
  minHeight: 2.5;

  <this>
    {props.children}
  </this>
}

const Cell = (props) => {
  forward: className;
  fontSize: 0.9;

  <this>
    {props.children}
  </this>
}

export default Table;
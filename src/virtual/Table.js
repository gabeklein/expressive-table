import Core from '../Core';
import Body from './Body';

export const Table = (props) => {
  const { children, ...rest } = props;

  <Core {...rest}>
    {children}
    <Body
      head={Head}
      header={Header}
      cell={Cell}
      row={Row}
      {...rest} 
    />
  </Core>
}

const Header = (props) => {
  forward: className;
  padding: 0, 10;

  <this>
    {props.children}
  </this>
}

const Head = (props) => {
  <div>{props.name}</div>
}

const Row = ({ offset, children }) => {
  forward: className;
  padding: 0, 10;

  <this style={{ top: offset }}>
    {children}
  </this>
}

const Cell = ({ children }) => {
  forward: className;
  fontSize: 0.9;
  paddingH: 0.6;
  overflow: hidden;
  textOverflow: ellipsis;
  whiteSpace: nowrap;

  <this>
    {children}
  </this>
}

Object.assign(Table, {
  Header,
  Head,
  Row,
  Cell
});

export default Table;
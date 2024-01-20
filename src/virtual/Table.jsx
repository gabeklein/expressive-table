import { Body } from './Body';

const Table = (props) => {
  <this>
    {props.children}
    <Body
      cell={Cell}
      row={Row}
      {...props} 
    />
  </this>
}

export { Table };

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
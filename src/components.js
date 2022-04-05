export const Header = (props) => {
  forward: className, style;
  padding: 0, 10;

  <this>
    {props.children}
  </this>
}

export const HeadCell = (props) => {
  <div>{props.column.name}</div>
}

export const Row = (props) => {
  forward: className;
  padding: 0, 10;

  <this style={{ top: props.offset }}>
    {props.children}
  </this>
}

export const Cell = (props) => {
  forward: className;
  fontSize: 0.9;
  overflow: hidden;
  paddingH: 0.6;
  textOverflow: ellipsis;
  whiteSpace: nowrap;

  <this>
    {props.children}
  </this>
}
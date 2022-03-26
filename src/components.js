export const Header = (props) => do {
  forward: className, style;
  padding: 0, 10;

  <this>
    {props.children}
  </this>
}

export const HeadCell = (props) => do {
  <div>{props.column.name}</div>
}

export const Row = (props) => do {
  forward: className;
  padding: 0, 10;

  <this style={{ top: props.offset }}>
    {props.children}
  </this>
}

export const Cell = (props) => do {
  fontSize: 0.9;
  overflow: hidden;
  paddingR: "1.2em";

  content: {
    whiteSpace: nowrap;
    overflow: hidden;
  }
  
  <this>
    <content>
      {props.children}
    </content> 
  </this>
}
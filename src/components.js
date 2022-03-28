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
  fontSize: 0.9;
  overflow: hidden;
  paddingR: 1.2;

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
export const DefaultHeader = ({ children }) => {
  display: grid;
  gridTemplateColumns: $tableRowColumns;
  marginRight: $headerMarginRight;
  columnGap: $tableGridGap;
  position: relative;
  minHeight: fill;
  outline: red;

  <this>
    {children}
  </this>
}

export const DefaultCell = () => {
  forward: className;
  fontSize: 0.9;
  overflow: hidden;
  textOverflow: ellipsis;
  whiteSpace: nowrap;
  outline: purple;
}

export const DefaultRow = ({ offset, style }) => {
  <this style={{ top: offset, ...style }} />
}
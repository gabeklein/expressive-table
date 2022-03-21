import Model from "@expressive/mvc";
import ReactDOM from "react-dom";
import Table, { Column } from "../../src";

const NoResults = () => do {
  textAlign: center;
  height: fill;
  flexAlign: center;
  color: 0x888;

  <this>- No Results -</this>
}

const App = () => do {
  Table: {
    fixed: 10;
    top: 60;
    outline: blue;
    textAlign: center;
    font: sans-serif;
  }
  
  <Table
    length={50}
    header={Header}
    empty={NoResults}
  >
    <Column name="foo" />
    <Column name="bar" />
  </Table>
}

const Header = ({ children }) => do {
  forward: className, style;
  padding: 20, 10;  
  font: 20;

  <this>{children}</this>
}

window.addEventListener("load", () => {
  ReactDOM.render(<App />,
    document.getElementById("react-root")
  );
});
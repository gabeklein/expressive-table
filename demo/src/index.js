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
    data={[
      { number: "one", letter: "A" },
      { number: "two", letter: "B" },
      { number: "three", letter: "C" },
      { number: "four", letter: "D" },
      { number: "five", letter: "E" },
      { number: "siz", letter: "F" },
    ]}
    header={Header}
    empty={NoResults}
    head={HeadCell}
  >
    <Column name="number" />
    <Column name="letter" />
  </Table>
}

const HeadCell = ({ children }) => do {
  color: navy;

  <this>
    {children}
  </this>
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
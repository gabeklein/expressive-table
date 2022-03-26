import Model from "@expressive/mvc";
import { useState } from "react";
import ReactDOM from "react-dom";
import Table, { Column } from "../../src";

const DATA = [
  { letter: "A", number: "one" },
  { letter: "B", number: "two" },
  { letter: "C", number: "three" },
  { letter: "D", number: "four" },
  { letter: "E", number: "five" },
  { letter: "F", number: "six" },
]

const App = () => {
  const [number, setNumber] = useState(30);

  Table: {
    fixed: 10;
    top: 60;
    outline: blue;
    textAlign: center;
    font: sans-serif;
  }
  
  <Table
    length={number}
    header={Header}
    empty={NoResults}
    head={HeadCell}
    didEnd={() => {
      console.log("did end!");
      setNumber((number) => number + 20)
    }}>
    <Column name="number" />
    <Column name="letter" />
  </Table>
}

const Header = ({ children }) => {
  forward: className, style;
  padding: 20, 10;  
  font: 20;

  <this>{children}</this>
}

const HeadCell = ({ children }) => {
  color: navy;

  <this>{children}</this>
}

const NoResults = () => {
  textAlign: center;
  height: fill;
  flexAlign: center;
  color: 0x888;

  <this>- No Results -</this>
}

window.addEventListener("load", () => {
  ReactDOM.render(<App />,
    document.getElementById("react-root")
  );
});
import Model from "@expressive/mvc";
import ReactDOM from "react-dom";
import Table, { Column } from "../../src";

class Control extends Model {
  length = 100;

  didCreate(){
    window.DEBUG = this;
  }
}

const App = () => do {
  const { length } = Control.use();
  
  Table: {
    fixed: 10;
    top: 60;
    outline: blue;
    textAlign: center;
    font: sans-serif;
  }
  
  <Table length={length} header={Header}>
    <Column name="foo" />
    <Column name="bar" />
  </Table>
}

const Header = ({ children }) => do {
  forward: className;
  padding: 20, 0;  
  font: 20;

  <this>{children}</this>
}

window.addEventListener("load", () => {
  ReactDOM.render(<App />,
    document.getElementById("react-root")
  );
});
import Model from "@expressive/mvc";
import ReactDOM from "react-dom";
import Table, { Col } from "../../src";

class Control extends Model {
  length = 100;

  didCreate(){
    window.DEBUG = this;
  }
}

const App = () => do {
  const { length } = Control.use();
  
  Table: {
    overflow: scroll;
    fixed: 10;
    top: 60;
    outline: blue;
    textAlign: center;
    font: sans-serif;
  }
  
  <Table length={length} header={Header}>
    <Col name="foo" />
    <Col name="bar" />
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
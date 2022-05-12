import Model from "@expressive/mvc";
import { useState } from "react";
import ReactDOM from "react-dom";

import Table, { Column } from "../../src";

class Names extends Model {
  names = [];

  constructor(){
    super();
    this.effect(() => this.getMore());
  }

  getMore = async () => {
    const res = await fetch("https://randomuser.me/api/?inc=name&nat=US&results=20");
    const data = await res.json();
    const names = data.results.map(x => x.name);

    this.names = this.names.concat(names);
  }
}

const App = () => {
  const { names, getMore } = Names.use();

  Table: {
    fixed: 10;
    outline: blue;
    textAlign: center;
    font: sans-serif;
  }
  
  <Table
    rows={names}
    header={Header}
    empty={NoResults}
    head={HeadCell}
    cell={Cell}
    didEnd={getMore}>
    <Column name="title" />
    <Column name="first" />
    <Column name="last" />
  </Table>
}

const Cell = ({ children }) => {
  flexAlign: center;
  
  <this>
    {children}
  </this>
}

const Header = ({ children, padding }) => {
  forward: className, style;
  padding: 20, 10;
  font: 20;

  <this>{children}</this>
}

const HeadCell = ({ children }) => {
  color: navy;
  outline: grey;

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
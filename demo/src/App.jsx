import Model from '@expressive/react';

import { Column, Virtual } from '../../src';

const GET_USER = "https://randomuser.me/api/?inc=name&nat=US&results=20";

class Names extends Model {
  names = [];

  constructor(){
    super(() => this.getMore());
  }

  async getMore(){
    const data = await fetch(GET_USER).then(x => x.json());

    this.names = [
      ...this.names,
      ...data.results.map(x => x.name)
    ]
  }
}

export function App(){
  const { names, getMore } = Names.use();

  Virtual: {
    fixed: 10;
    outline: blue;
    textAlign: center;
    font: sans-serif;
  }
  
  <Virtual
    rows={names}
    // header={Header}
    // head={HeadCell}
    // cell={Cell}
    empty={NoResults}
    didEnd={getMore}>
    <Column name="title" />
    <Column name="first" />
    <Column name="last" />
  </Virtual>
}

function Cell(){
  flexAlign: center;
}

function Header() {
  padding: 20, 10;
  font: 20;
}

function HeadCell() {
  color: navy;
  outline: grey;
}

function NoResults(){
  textAlign: center;
  height: fill;
  flexAlign: center;
  color: 0x888;

  <this>- No Results -</this>
}
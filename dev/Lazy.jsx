import Model from '@expressive/react';

import { Column, Table } from "../src";

const GET_USER = "https://randomuser.me/api/?inc=name&nat=US&results=20";

class Grid extends Table {
  /** @type {Array<{first: string, last: string}}>} */
  data = [];

  constructor(){
    super(() => this.getMore());
  }

  async getMore(){
    const data = await fetch(GET_USER)
      .then(x => x.json())
      .then(x => x.results);

    this.data = this.data.concat(data);
  }
}

const Demo = () => {
  width: fill;
  height: 500;
  maxWidth: 1000;
  margin: 20, auto;
  backgroundColor: 0xffffff;
  radius: 8;
  overflow: hidden;
  border: 0xeee;
  fontFamily: "sans-serif";
  fontSize: 14;

  Grid: {
    margin: -1;
  }

  <Grid>
    <Column name="First Name" id="first" />
    <Column name="Last Name" id="last" />
  </Grid>
}

export default Demo;
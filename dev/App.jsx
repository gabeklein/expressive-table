import Model from '@expressive/react';

import { Column, Grid } from "../src";

const GET_USER = "https://randomuser.me/api/?inc=name&nat=US&results=20";

class Names extends Model {
  names = [];

  constructor(){
    super(() => this.getMore());
  }

  async getMore(){
    const data = await fetch(GET_USER)
      .then(x => x.json())
      .then(x => x.results;

    this.names = this.names.concat(data);
  }
}

const Demo = () => {
  const { names } = Names.use();

  width: fill;
  height: 500;
  maxWidth: 1000;
  margin: '20px auto';
  backgroundColor: 0xffffff;
  radius: 8;
  overflow: hidden;
  border: 0xeee;

  Grid: {
    height: fill;
    margin: -1;
    fontFamily: "sans-serif";
    fontSize: 14;
  }

  <Grid
    data={names}
    rowHeight={50}
    bufferItems={5}
  >
    <Column name="First Name" id="first" />
    <Column name="Last Name" id="last" />
  </Grid>
}

export default Demo;
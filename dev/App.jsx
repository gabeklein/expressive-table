import Model from '@expressive/react';

import { Column, Virtual } from "../src";

const GET_USER = "https://randomuser.me/api/?inc=name&nat=US&results=20";

class Table extends Virtual {
  data = [] as { first: string; last: string }[];

  constructor(){
    super(() => this.getMore());
  }

  async getMore(){
    const data = await fetch(GET_USER)
      .then(x => x.json())
      .then(x => x.results;

    this.data = this.data.concat(data);
  }
}

const Demo = () => {
  width: fill;
  height: 500;
  maxWidth: 1000;
  margin: '20px auto';
  backgroundColor: 0xffffff;
  radius: 8;
  overflow: hidden;
  border: 0xeee;

  Table: {
    height: fill;
    margin: -1;
    fontFamily: "sans-serif";
    fontSize: 14;
  }

  <Table>
    <Column name="First Name" id="first" />
    <Column name="Last Name" id="last" />
  </Table>
}

export default Demo;
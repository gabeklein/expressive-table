import { createElement, memo } from 'react';

import { Grid, Header, Row } from '../Grid';
import { Virtual } from './Virtual';

/** @type React.FC<Grid.BodyProps> */
export const Body = ({ style, className }) => {
  const { body, inner, outer } = Virtual.get();

  container: {
    position: 'relative';
    overflowY: 'auto';
  }

  gridRow: {
    display: grid;
    gridTemplateColumns: $tableColumns;
    columnGap: $tableGap;
  }

  <container ref={outer} style={style} className={className}>
    <inner ref={inner}>
      <Header gridRow />
      <body ref={body}>
        <Rows gridRow />
      </body>
    </inner>
  </container>
}

/** @type React.FC<Grid.RowProps> */
const Rows = (props) => {
  const { slice } = Virtual.get();

  return slice.map(data => (
    <Row {...props} key={data.id} data={data} />
  ))
}
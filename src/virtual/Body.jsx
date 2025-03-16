import { createElement, memo } from 'react';

import { Header, Rows } from '../components';
import { Grid } from '../Grid';
import { Virtual } from './Virtual';

/** @type React.FC<Grid.BodyProps> */
export const DefaultBody = ({ style, className }) => {
  const { body, inner, outer } = Virtual.get();

  container: {
    position: 'relative';
    overflowY: 'auto';
  }

  <container ref={outer} style={style} className={className}>
    <Header />
    <inner ref={inner}>
      <body ref={body}>
        <Rows />
      </body>
    </inner>
  </container>
}

/** @type React.FC<Grid.HeaderProps> */
export const DefaultHeader = () => {
  backgroundColor: 0xf3f4f6;
  columnGap: $tableGap;
  display: grid;
  gridTemplateColumns: $tableColumns;
  position: sticky;
  top: 0;
  zIndex: 10;
}

/** @type React.FC<Grid.HeadProps> */
export const DefaultHead = ({ column }) => {
  padding: '16px';
  textAlign: 'left';
  fontWeight: 500;
  color: 0x4b5563;
  borderBottom: 0xe5e7eb;
}

/** @type React.FC<Grid.RowProps> */
export const DefaultRow = ({ data }) => {
  backgroundColor: 0xffffff;
  borderBottom: 0xe5e7eb;
  columnGap: $tableGap;
  display: grid;
  gridTemplateColumns: $tableColumns;
  transition: 'background-color 0.2s';

  if(":hover")
    backgroundColor: 0xf9fafb;
}

/** @type React.FC<Grid.CellProps> */
export const DefaultCell = ({ data }) => {
  padding: 16;
  color: 0x4b5563;
}
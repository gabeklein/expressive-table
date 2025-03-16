import { createElement, memo } from 'react';

import { Grid } from '../Grid';
import { Virtual } from './Virtual';

/** @type React.FC<Grid.BodyProps> */
export const Body = ({ header, children }) => {
  const { body, inner, outer } = Virtual.get();

  position: 'relative';
  overflowY: 'auto';

  <this ref={outer}>
    {header}
    <inner ref={inner}>
      <body ref={body}>
        {children}
      </body>
    </inner>
  </this>
}

/** @type React.FC<Grid.HeaderProps> */
export const Header = () => {
  backgroundColor: 0xf3f4f6;
  columnGap: $tableGap;
  display: grid;
  gridTemplateColumns: $tableColumns;
  position: sticky;
  top: 0;
  zIndex: 10;
}

/** @type React.FC<Grid.HeadProps> */
export const Head = ({ column }) => {
  padding: '16px';
  textAlign: 'left';
  fontWeight: 500;
  color: 0x4b5563;
  borderBottom: 0xe5e7eb;
}

/** @type React.FC<Grid.RowProps> */
export const Row = ({ data }) => {
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
export const Cell = ({ data }) => {
  padding: 16;
  color: 0x4b5563;
}
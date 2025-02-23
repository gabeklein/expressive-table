import Model, { Provider } from '@expressive/react';
import React from 'react';

import { Body } from './Body';
import { IColumn, ITable } from './Control';

declare namespace Table {
  interface Props extends Model.Assign<ITable> {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }
}

const Table = (props: Table.Props) => {
  const { children, ...rest } = props;
  const control = ITable.setup(rest);

  return (
    <Provider for={control}>
      {children}
      <Body {...rest} />
    </Provider>
  )
};

declare namespace Column {
  type Props = Model.Assign<IColumn>;
}

const Column = (props: Column.Props) => {
  IColumn.setup(props);
  return null;
}

export { Table, Column };
import Model, { Provider } from '@expressive/react';
import React, { Children, isValidElement, cloneElement } from 'react';

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

  return (
    <Provider for={ITable} set={rest}>
      <Reset />
      {Children.map(children, (child) => {
        if(isValidElement(child) && child.key == null)
          return cloneElement(child, {
            key: child.props.id || child.props.name
          });     
      })}
      <Body {...rest} />
    </Provider>
  )
};

const Reset = () => {
  ITable.get().columns = [];
  return null;
};

declare namespace Column {
  type Props = Model.Assign<IColumn>;
}

const Column = (props: Column.Props) => {
  IColumn.setup(props);
  return null;
}

export { Table, Column };
import { Provider, useModel } from '@expressive/mvc';

import * as components from './components';
import Grid from './Grid';
import VirtualBody from './VirtualBody';

export const Table = (props) => {
  const control = useModel(() => {
    const source = props.for;

    if(!source)
      return new Grid();

    if(source instanceof Grid)
      return source;

    if(Grid.isTypeof(source))
      return new source();

    throw new Error("Table expects either an instance or typeof Grid.");
  }, []);

  control.import(props);

  <Provider for={control}>
    {props.children}
    <VirtualBody {...props} />
  </Provider>
}

Object.assign(Table, components);

export default Table;
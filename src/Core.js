import { Provider, useModel } from '@expressive/mvc';
import { useMemo } from 'react';

import Grid from './Grid';

export const Core = (props) => {
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
  </Provider>
}

export default Core;
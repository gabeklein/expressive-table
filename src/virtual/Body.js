import Model, { Provider } from '@expressive/mvc';
import { useLayoutEffect, useMemo, useState } from 'react';

import Grid from '../Grid';
import Header from '../Header';
import Rows from './Rows';
import Virtual from './Virtual';

const Body = (props) => {
  const {
    rows,
    template,
    length,
    didEnd
  } = Grid.tap();

  const {
    is: virtual,
    container,
    size,
    areaX
  } = Virtual.use();

  const [
    padding,
    setPadding
  ] = useState();

  const style = {
    ...props.style,
    "--row-columns": template
  };

  useMemo(() => {
    virtual.didEnd = didEnd;
    virtual.length = rows ? rows.length : length;
    virtual.update("length");
  }, [length, rows, didEnd]);

  useLayoutEffect(() => {
    const element = container.current;

    if(element)
      setPadding(
        element.parentElement.scrollWidth -
        element.scrollWidth
      )
  }, [length, container.current]);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={style}>
    <Provider for={virtual}>
      <Header {...props} padding={padding} />
      <div
        ref={size ? container : undefined}
        style={{ overflowY: "auto" }}>
        {props.before}
        <Rows {...props} />
        {props.after}
      </div>
    </Provider>
  </this>
}

export default Body;
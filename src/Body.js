import { ref } from '@expressive/mvc';
import { Children, useLayoutEffect, useRef, useState } from 'react';

import Header from './Header';

const useCalibrate = (children, ref) => {
  if(!ref)
    ref = useRef();

  const [offset, setOffset] = useState();

  useLayoutEffect(() => {
    const element = ref.current;

    if(element)
      setOffset(
        element.parentElement.scrollWidth -
        element.scrollWidth
      )
  }, [
    Children.toArray(children).length
  ]);

  return [offset, ref];
}

const Body = (props) => {
  const { children, style, template } = props;
  const [offset, ref] = useCalibrate(children);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{
    "--row-columns": template,
    ...style
  }}>
    <Header {...props} padding={offset} />
    <div ref={ref} style={{ overflowY: "auto" }}>
      {children}
    </div>
  </this>
}

export default Body;
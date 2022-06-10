import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react';

import Header from './Header';

const Body = forwardRef((props, ref) => {
  const calibrate = useRef(null);
  const [offset, setOffset] = useState();
  const refCallback = useCallback(element => {
    if(ref)
      ref(element);

    calibrate.current = element;
  })

  useLayoutEffect(() => {
    const element = calibrate.current;

    if(element)
      setOffset(
        element.parentElement.scrollWidth -
        element.scrollWidth
      )
  }, []);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{
    "--row-columns": props.template,
    ...props.style
  }}>
    <Header {...props} padding={offset} />
    <div ref={refCallback} style={{ overflowY: "auto" }}>
      {props.children}
    </div>
  </this>
})

export default Body;
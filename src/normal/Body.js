import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import Grid from '../Grid';
import Header from '../Header';
import Row from '../Row';
import { uniqueId } from '../util';

const usePadding = (length) => {
  const calibrate = useRef(null);
  const [offset, setOffset] = useState();

  useLayoutEffect(() => {
    const element = calibrate.current;

    if(element)
      setOffset(
        element.parentElement.scrollWidth -
        element.scrollWidth
      )
  }, [length]);

  return [offset, calibrate];
}

const Body = (props) => {
  const { rows, template, length } = Grid.tap();

  const entries = useMemo(() => {
    return rows || Array.from({ length }, i => i);
  }, [length, rows]);

  const [ padding, calibrate ] = usePadding(length);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{
    "--row-columns": template,
    ...props.style
  }}>
    <Header {...props} padding={padding} />
    <div ref={calibrate} style={{ overflowY: "auto" }}>
      {entries.map((row, index) => {
        const key = props.refresh
          ? Math.random()
          : uniqueId(row);

        <Row {...props}
          index={index}
          data={row}
          key={key}
        />
      })}
    </div>
  </this>
}

export default Body;
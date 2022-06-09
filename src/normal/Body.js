import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import Grid from '../Grid';
import Header from '../Header';
import Row from '../Row';
import { uniqueId } from '../util';

const Body = (props) => {
  const { rows, template, length } = Grid.tap();

  const calibrate = useRef(null);

  const entries = useMemo(() => {
    return rows || Array.from({ length }, i => i);
  }, [length, rows]);

  const [offset, setOffset] = useState();

  useLayoutEffect(() => {
    const element = calibrate.current;

    if(element)
      setOffset(
        element.parentElement.scrollWidth -
        element.scrollWidth
      )
  }, [entries.length]);

  forward: className;
  gridRows: min, "minmax(0, 1.0fr)";
  overflow: hidden;

  <this style={{
    "--row-columns": template,
    ...props.style
  }}>
    <Header {...props} padding={offset} />
    <div style={{ overflowY: "auto" }} ref={calibrate}>
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
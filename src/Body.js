import { ref } from '@expressive/mvc';
import { Children, forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react';

import Grid from './Grid';
import { either } from './util';

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
  }, [
    Children.toArray(props.children).length
  ]);

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

export const Header = (props) => {
  const { header: Header, padding } = props;
  const { is: control, columns } = Grid.tap();

  row: {
    display: grid;
    gridTemplateColumns: "var(--row-columns)";
    position: relative;
    minHeight: fill;
  }

  Head: {
    overflow: hidden;
  }

  if(Header)
    <Header context={control} padding={padding}>
      <row style={padding ? { marginRight: padding } : undefined}>
        {columns.map((column, i) => {
          const Head = either(column.head, props.head);

          if(Head)
            <Head
              key={column.name}
              context={control}
              index={i}
              column={column}
              name={column.name}
              props={column.props}>
              {column.name}
            </Head>
          else
            <div key={column.name}>
              {Head !== false && column.name}
            </div>
        })}
      </row>
    </Header>
}

export default Body;
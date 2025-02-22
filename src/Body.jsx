import { ITable } from "./Control";
import { DefaultHeader, DefaultHead, DefaultRow, DefaultCell } from "./components";

/** @type React.FC<{ style?: React.CSSProperties, className?: string }> */
export const Body = ({ style, className }) => {
  const {
    body,
    columns,
    data,
    inner,
    outer,
    range,
    Cell = DefaultCell,
    Head = DefaultHead,
    Header = DefaultHeader,
    Row = DefaultRow,
  } = ITable.get();

  container: {
    position: 'relative';
    overflowY: 'auto';
  }

  gridRow: {
    display: grid;
    gridTemplateColumns: $tableRowColumns;
    columnGap: $tableGridGap;
  }

  <container ref={outer} style={style} className={className}>
    <inner ref={inner}>
      <Header gridRow>
        {columns.map(column => (
          <Head key={column.key} column={column} />
        ))}
      </Header>
      <body ref={body}>
        {data.slice(...range).map((item) => {
          <Row gridRow key={item.id}>
            {columns.map(column => {
              <Cell key={column.key} column={column} data={item} />
            })}
          </Row>
        })}
      </body>
    </inner>
  </container>
}
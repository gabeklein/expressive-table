export const Status = ({ active }) => {
  display: flex;
  alignItems: center;
  height: fill;
  fontSize: 12;

  if(active)
    color: green;
  else
    color: red;

  inner: {
    radius: round;
    padding: 3, 10;
    color: currentColor;
    textAlign: center;
    border: currentColor;
    position: relative;
    overflow: hidden;
    width: 50;
  }

  bg: {
    absolute: fill;
    background: currentColor;
    opacity: 0.1;
  }

  <this>
    <inner>
      {active ? "Active" : "Closed"}
      <bg />
    </inner>
  </this>
}
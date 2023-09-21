import { useEffect, useState } from "react";

const Test = () => {
  const [side, setSide] = useState(true);
  const [rend, setRend] = useState(true);
  console.log("1");
  console.log("side", side);
  console.log("rend", rend);

  useEffect(() => {
    console.log("2");
    console.log("side", side);
    console.log("rend", rend);
    setRend(!rend);
    console.log("3");
    console.log("side", side);
    console.log("rend", rend);
  }, [side]);

  console.log("4");
  console.log("side", side);
  console.log("rend", rend);

  const handleClick = () => {
    console.log("10");
    setRend(!rend);
    console.log("11");

  }

  return (
    <div
      className={side ? style.frontCard : style.backCard}
      onClick={() => setSide(!side)}
    >
      {side ? <h3>hola</h3> : <h3>bye</h3>}
      <button
      onClick={handleClick}
      >click me</button>
    </div>
  );
};
export default Test;

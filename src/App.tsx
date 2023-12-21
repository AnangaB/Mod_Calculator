import { useState } from "react";
import CalculatorButton from "./components/CalculatorButton.tsx";
import TopDisplay from "./components/TopDisplay.tsx";
import { getNewDisplayingItems } from "./logic/CalculatorInput.ts";

function App() {
  const [displayingItems, setDisplayingItems] = useState<string>("0");

  const [nValue, setNValue] = useState(-1);

  //construct the display
  let resultDisplay = (
    <TopDisplay value={"" + displayingItems} onNChange={setNValue}></TopDisplay>
  );
  console.log("nvalue in app ", nValue);
  //construct the buttons
  const buttonValues = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "/",
    "^",
    "log",
    "(",
    ")",
    "=",
    "C",
  ];

  const handleButtonClick = (value: string) => {
    const currentDisplayingItems = displayingItems || "";

    setDisplayingItems(
      getNewDisplayingItems(value, currentDisplayingItems, nValue)
    );
  };

  const buttons = [];
  for (let i = 0; i < 20; i += 4) {
    buttons.push(
      <div className="row mb-3 gx-3 gy-3">
        <CalculatorButton
          value={buttonValues[i]}
          onClick={() => handleButtonClick(buttonValues[i])}
        />
        <CalculatorButton
          value={buttonValues[i + 1]}
          onClick={() => handleButtonClick(buttonValues[i + 1])}
        />
        <CalculatorButton
          value={buttonValues[i + 2]}
          onClick={() => handleButtonClick(buttonValues[i + 2])}
        />
        <CalculatorButton
          value={buttonValues[i + 3]}
          onClick={() => handleButtonClick(buttonValues[i + 3])}
        />
      </div>
    );
  }

  return (
    <div className="container-sm d-flex  justify-content-center border border-primary">
      <div className=" col-sm-12 col-md-6 col-lg-5 p-3 border border-primary">
        {resultDisplay}
        {buttons}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import CalculatorButton from "./components/CalculatorButton.tsx";
import TopDisplay from "./components/TopDisplay.tsx";
import { getNewDisplayingItems } from "./logic/CalculatorHandleButtonInputLogic.ts";
import PageBanner from "./components/PageBanner.tsx";

function App() {
  //displayingItems refers to the numbers and operations being typed in as input
  //const [displayingItems, setDisplayingItems] = useState<string>("0");
  const [displayingItems, setDisplayingItems] = useState<string>(
    "(32432^(10*22*(-2))+22*33^(-33)+(222*333^(222-22*336)))"
  );
  //nValue is the modiing value n
  const [nValue, setNValue] = useState(-1n);

  //making the buttons work, also by keyboard press
  const [isNTextfieldActive, setIsNTextfieldActive] = useState(false);

  //construct the display
  let resultDisplay = (
    <TopDisplay
      value={"" + displayingItems}
      onNChange={setNValue}
      isTextFieldActive={setIsNTextfieldActive}
    ></TopDisplay>
  );
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

  //when a calculator button is clicked, the value of that button is passed on to handleButtonClick whihc handles it by calling upon function getNewDisplayingItems
  const handleButtonClick = (value: string) => {
    const currentDisplayingItems = displayingItems || "";

    setDisplayingItems(
      getNewDisplayingItems(value, currentDisplayingItems, nValue)
    );
  };

  //store all the buttons display in buttons
  const buttons = [];
  for (let i = 0; i < 20; i += 4) {
    buttons.push(
      <div className="row mb-3">
        <CalculatorButton
          key={i}
          value={buttonValues[i]}
          onClick={() => handleButtonClick(buttonValues[i])}
          shouldKeyPressBerecognized={isNTextfieldActive}
        />
        <CalculatorButton
          value={buttonValues[i + 1]}
          key={i + 1}
          onClick={() => handleButtonClick(buttonValues[i + 1])}
          shouldKeyPressBerecognized={isNTextfieldActive}
        />
        <CalculatorButton
          value={buttonValues[i + 2]}
          key={i + 2}
          onClick={() => handleButtonClick(buttonValues[i + 2])}
          shouldKeyPressBerecognized={isNTextfieldActive}
        />
        <CalculatorButton
          value={buttonValues[i + 3]}
          key={i + 3}
          onClick={() => handleButtonClick(buttonValues[i + 3])}
          shouldKeyPressBerecognized={isNTextfieldActive}
        />
      </div>
    );
  }

  //display the buttons, top display and the banner

  return (
    <div className="container-fluid bg-light">
      <PageBanner />
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-6 p-3 mx-5 border border-dark rounded border-5">
          {resultDisplay}
          <div className="my-3 w-100 border-top border-5 border-dark"></div>
          {buttons}
        </div>
      </div>
    </div>
  );
}

export default App;

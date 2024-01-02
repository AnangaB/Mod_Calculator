import { useState } from "react";
import CalculatorButton from "./components/CalculatorButton.tsx";
import TopDisplay from "./components/TopDisplay.tsx";
import { getNewDisplayingItems } from "./logic/CalculatorHandleButtonInputLogic.ts";
import PageBanner from "./components/PageBanner.tsx";

function App() {
  //displayingItems refers to the numbers and operations being typed in as input
  //const [displayingItems, setDisplayingItems] = useState<string>("0");
  const [displayingItems, setDisplayingItems] = useState<string>("0");
  //nValue is the modiing value n
  const [nValue, setNValue] = useState(-1n);

  //making the buttons work, also by keyboard press
  const [isNTextfieldActive, setIsNTextfieldActive] = useState(false);

  //construct the display
  let resultDisplay = (
    <TopDisplay
      key="result-display"
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
    const currentDisplayingItems = displayingItems;

    setDisplayingItems(
      getNewDisplayingItems(value, currentDisplayingItems, nValue)
    );
  };

  //function to assign a color to a button depending on its index
  function getButtonColor(i: number) {
    if (i >= 10 && i < 18) {
      return "primary";
    } else if (i == 18) {
      return "danger";
    } else if (i == 19) {
      return "warning";
    }
    return "dark";
  }
  //store all the buttons display in buttons
  const buttons = [];
  for (let i = 0; i < 20; i += 4) {
    buttons.push(
      <div className="row" key={`button-row-${i}`}>
        <CalculatorButton
          key={"button" + buttonValues[i]}
          value={buttonValues[i]}
          onClick={() => handleButtonClick(buttonValues[i])}
          shouldKeyPressBerecognized={isNTextfieldActive}
          color={getButtonColor(i)}
        />
        <CalculatorButton
          key={"button" + buttonValues[i + 1]}
          value={buttonValues[i + 1]}
          onClick={() => handleButtonClick(buttonValues[i + 1])}
          shouldKeyPressBerecognized={isNTextfieldActive}
          color={getButtonColor(i + 1)}
        />
        <CalculatorButton
          key={"button" + buttonValues[i + 2]}
          value={buttonValues[i + 2]}
          onClick={() => handleButtonClick(buttonValues[i + 2])}
          shouldKeyPressBerecognized={isNTextfieldActive}
          color={getButtonColor(i + 2)}
        />
        <CalculatorButton
          value={buttonValues[i + 3]}
          key={"button" + buttonValues[i + 3]}
          onClick={() => handleButtonClick(buttonValues[i + 3])}
          shouldKeyPressBerecognized={isNTextfieldActive}
          color={getButtonColor(i + 3)}
        />
      </div>
    );
  }

  //display the buttons, top display and the banner

  return (
    <div className="container-fluid bg-light">
      <PageBanner />
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-5 col-xl-4 border border-dark rounded-0 border-5">
          {resultDisplay}
          {buttons}
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";

interface Props {
  value: string;
  onNChange: (n: number) => void;
}

const TopDisplay = ({ value, onNChange }: Props) => {
  const [isNFixed, setIsNFixed] = useState(false);

  const [n, setN] = useState<number>(-1);

  const [nInput, setNInput] = useState("n");

  const [isValidNInput, setIsValidNInput] = useState(true);
  function setButtonOnClick() {
    const parsedValue = parseFloat(nInput);
    if (
      !isNaN(parsedValue) &&
      parsedValue > 0 &&
      Number.isInteger(parsedValue)
    ) {
      setN(parsedValue);
      setIsNFixed(true);
      setIsValidNInput(true);
      onNChange(parsedValue);
    } else {
      setIsValidNInput(false);
    }
  }

  function changeButtonOnClick() {
    setIsNFixed(false);
  }

  return (
    <div className="border row justify-content-between">
      <div className="col-6 border border-primary">
        <p className="fs-6" style={{ wordWrap: "break-word" }}>
          {value}
        </p>
      </div>
      <div className="col-6 border-primary d-flex overflow-auto justify-content-start">
        <label htmlFor="n">
          <p style={{ paddingRight: "1rem" }}>mod</p>
        </label>
        {!isNFixed && (
          <div>
            <input
              className={
                isValidNInput
                  ? "form-control"
                  : "form-control border border-danger border-2"
              }
              placeholder={nInput}
              type="number"
              id="n"
              name="n"
              onChange={(e) => setNInput(e.target.value)}
            />
            <button
              type="button"
              onClick={setButtonOnClick}
              className="btn btn-primary"
            >
              Set
            </button>
          </div>
        )}
        {isNFixed && (
          <div>
            <p>{n}</p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={changeButtonOnClick}
            >
              Change
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopDisplay;

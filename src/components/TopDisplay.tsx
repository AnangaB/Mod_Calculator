import { useState } from "react";

interface Props {
  value: string;
  onNChange: (n: bigint) => void;
  isTextFieldActive: (b: boolean) => void;
}
//Responsible for the calculator input display and the mod n option/display
const TopDisplay = ({ value, onNChange, isTextFieldActive }: Props) => {
  const [isNFixed, setIsNFixed] = useState(false);

  const [n, setN] = useState<bigint>(-1n);

  const [nInput, setNInput] = useState("n");

  const [isValidNInput, setIsValidNInput] = useState(true);

  function setButtonOnClick() {
    const parsedValue = BigInt(nInput);
    if (typeof parsedValue === "bigint" && parsedValue > 0) {
      setN(parsedValue);
      setIsNFixed(true);
      setIsValidNInput(true);
      onNChange(parsedValue);
      isTextFieldActive(false);
    } else {
      setIsValidNInput(false);
    }
  }

  function changeButtonOnClick() {
    setIsNFixed(false);
  }

  return (
    <div className="row justify-content-between">
      <div className="col-8 m-0 bg-info border border-start-0 border-top-0 border-dark rounded-0 border-5">
        <p className="h4 p-1" style={{ wordWrap: "break-word" }}>
          {value}
        </p>
      </div>
      <div className="col-4 d-flex overflow-auto justify-content-start p-1 border-bottom border-dark border-5">
        {!isNFixed && (
          <div>
            <label htmlFor="n">
              <p className="h5" style={{ paddingRight: "1rem" }}>
                mod
              </p>
            </label>
            <input
              className={
                isValidNInput
                  ? "form-control rounded-0"
                  : "form-control border border-danger border-3 rounded-0"
              }
              placeholder={nInput}
              type="number"
              id="n"
              name="n"
              onFocus={() => isTextFieldActive(true)}
              onBlur={() => isTextFieldActive(false)}
              onChange={(e) => setNInput(e.target.value)}
            />
            <button
              type="button"
              onClick={setButtonOnClick}
              className="btn btn-primary rounded-0"
            >
              Set
            </button>
          </div>
        )}
        {isNFixed && (
          <div>
            <p className="h5">mod {String(n)}</p>
            <button
              type="button"
              className="btn btn-danger rounded-0"
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

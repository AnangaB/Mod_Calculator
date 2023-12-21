import { useState } from "react";

interface Props {
  value: string;
  onNChange: (n: bigint) => void;
}

const TopDisplay = ({ value, onNChange }: Props) => {
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
    } else {
      setIsValidNInput(false);
    }
  }

  function changeButtonOnClick() {
    setIsNFixed(false);
  }

  return (
    <div className="row justify-content-between pb-3">
      <div className="col-6 border border-dark border-3">
        <p className="fs-6" style={{ wordWrap: "break-word" }}>
          {value}
        </p>
      </div>
      <div className="col-6 d-flex overflow-auto justify-content-start">
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
            <p>{String(n)}</p>
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

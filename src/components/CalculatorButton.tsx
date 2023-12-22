import { useEffect } from "react";

interface Props {
  value: string;
  onClick: () => void;
}
//component for a calculator button, when button clicked or a key pressed correspoding to button value, then the passed fucnction onClick will run
const CalculatorButton = ({ value, onClick }: Props) => {
  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      if (event.key === value) {
        onClick();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [value, onClick]);

  return (
    <button
      type="button"
      className="btn btn-success btn-lg col-3"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;

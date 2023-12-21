interface Props {
  value: string;
  onClick?: () => void;
}

const CalculatorButton = ({ value, onClick }: Props) => {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-lg col-3"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;

import { DifficultyInputProps } from "../../models/PropsInterface";

const DifficultyInput: React.FC<DifficultyInputProps> = ({
  difficulty,
  register,
  name,
}) => {
  const fillColor = difficulty.color ? difficulty.hexColor : "transparent";

  return (
    <div className="d-flex align-items-center">
      <label
        className={`difficulty-circle mx-1`}
        htmlFor={`difficulty-${difficulty.label}`}
        style={{ backgroundColor: fillColor }}
      >
        {difficulty.color ? "" : difficulty.label}
      </label>
      <input
        id={`difficulty-${difficulty.label}`}
        type="number"
        min="0"
        className="form-control mx-2"
        {...register(name)}
        style={{ width: "60px" }}
      />
    </div>
  );
};

export default DifficultyInput;

import { DifficultyInputProps } from "../models/PropsInterface";

const DifficultyInput: React.FC<DifficultyInputProps> = ({
  difficulty,
  register,
  name,
  onCountChange,
}) => {
  const fillColor = difficulty.color ? difficulty.hexColor : "transparent";

  // Mettre à jour le count sur changement d'input
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value, 10) || 0;
    onCountChange(difficulty, newCount); // Remonte la difficulté et le count
  };
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
        tabIndex={-1} // empêche le focus initial
        onChange={handleCountChange}
      />
    </div>
  );
};

export default DifficultyInput;

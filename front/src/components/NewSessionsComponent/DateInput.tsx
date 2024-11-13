import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormSessionProps } from "../../models/PropsInterface";

interface DateInputProps {
  register: UseFormRegister<FormSessionProps>;
}

const DateInput: React.FC<DateInputProps> = ({ register }) => (
  <div className="col-md-6">
    <label htmlFor="sessionDate" className="form-label">
      Date de la session
    </label>
    <input
      {...register("date", { required: true })}
      type="date"
      className="form-control"
      id="sessionDate"
    />
  </div>
);

export default DateInput;

import React from "react";
import { DateInputProps } from "../../models/PropsInterface";
const DateInput: React.FC<DateInputProps> = ({ register }) => (
  <div className="date-input">
    <label htmlFor="sessionDate" className="form-label">
      Date de la session
    </label>
    <input
      {...register("dateTimeStart", { required: true })}
      type="datetime-local"
      className="form-control"
      id="sessionDate"
    />
  </div>
);

export default DateInput;

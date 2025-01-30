import React, { useEffect, useState } from "react";
import { DateInputProps } from "../../models/PropsInterface";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
const DateInput: React.FC<DateInputProps> = ({ control, initialDate }) => {
  const [date, setDate] = useState<Date | null>(new Date());

  // Met à jour le state local quand `startTime` change
  useEffect(() => {
    if (initialDate) {
      const parsedDate = new Date(initialDate);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate); // Si la conversion réussit, met à jour le state
      } else {
        console.error("Invalid startTime format:", initialDate);
      }
    }
  }, [initialDate]);

  return (
    <div className="date-input">
      <label htmlFor="sessionDate" className="form-label">
        Date de la session
      </label>
      <Controller
        name="dateTimeStart"
        control={control}
        defaultValue={date?.toISOString() || ""}
        render={({ field }) => (
          <DatePicker
            locale="fr"
            id="start-time"
            dateFormat="dd/MM/yyyy, HH:mm"
            showWeekNumbers
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            className="form-control"
            maxDate={new Date()}
            timeCaption="Heure"
            selected={date}
            onChange={(selectedDate) => {
              setDate(selectedDate);
              field.onChange(selectedDate?.toISOString() || ""); // Met à jour la valeur dans react-hook-form
            }}
          />
        )}
      />
    </div>
  );
};

export default DateInput;

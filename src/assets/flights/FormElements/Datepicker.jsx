import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { subDays, addDays } from "date-fns";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";

export function Datepicker(props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      dateFormat="yyyy-MM-dd"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={addDays(new Date(), 0)}
      className="w-full border border-solid border-[#ccc] rounded-[4px] px-2 py-[5px]"
      {...props}
    />
  );
}

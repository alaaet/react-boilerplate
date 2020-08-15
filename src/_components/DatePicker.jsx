import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

const DatePickerField = ({ handleMinor, handleNull, minAge, ...props }) => {
  const { setFieldValue, validateField } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      id="datePickerField"
      {...field}
      {...props}
      className="w-100"
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        //console.log(val);
        document.getElementById("datePickerField").focus();
        setFieldValue(field.name, val);
      }}
      onBlur={() => {
        if (field.value) {
          var diff = new Date().getTime() - field.value.getTime();
          const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
          handleMinor(age < minAge);
          handleNull(false);
        } else {
          handleNull(true);
        }
      }}
    />
  );
};

export { DatePickerField };

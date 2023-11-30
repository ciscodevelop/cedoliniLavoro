import React from "react";
import "./inputRow.scss";
import { useStore } from "@/store/paySlip/usePaySlip";

interface InputRowProps {
  paySlip: any;
  field: string;
  name: string;
  value: any;
}

function InputRow({ paySlip, field, name, value }: InputRowProps) {
  const { edit } = useStore();

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.currentTarget.select();
  };

  const handleChangeInput = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, name, type, checked } = evt.currentTarget;
    const convertedValue = type === "checkbox" ? checked : value;

    if (type === "checkbox" || /^[0-8]$/.test(value) || value === "") {
      edit(paySlip.id, name, convertedValue);
    } else if (name === "typeOfAbsance") {
      edit(paySlip.id, name, value);
    }
  };

  const determineInputType = (): string => {
    const fieldType = typeof paySlip[field];
    return fieldType === "boolean"
      ? "checkbox"
      : fieldType === "string"
      ? "text"
      : "number";
  };

  const inputType = determineInputType();
  const isCheckbox = inputType === "checkbox";
  const isChecked = isCheckbox && paySlip[field];

  const hanlderOnBlur = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    !event.currentTarget.value && !isCheckbox&& (edit(paySlip.id, name, "0"))
  };
  return (
    <input
    style={value!=0?{color:"green"}:{}}
      className="input-row"
      name={name}
      type={inputType}
      value={value || ""}
      checked={isChecked}
      onChange={handleChangeInput}
      onFocus={handleFocus}
      onBlur={hanlderOnBlur}
     
    />
  );
}

export default InputRow;

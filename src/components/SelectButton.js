import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span onClick={onClick} className={selected ? "selectedBtn" : "selectBtn"}>
      {children}
    </span>
  );
};

export default SelectButton;

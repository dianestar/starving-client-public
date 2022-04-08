import React from "react";

const FormButton = ({ desc, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-3/4 h-12 rounded bg-cyan-400 text-white"
    >
      {desc}
    </button>
  );
};

export default FormButton;

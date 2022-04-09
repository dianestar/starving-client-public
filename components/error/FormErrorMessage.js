import React from "react";

function FormErrorMessage({ message }) {
  return (
    <section className="text-sm font-bold text-red-700">{message}</section>
  );
}

export default FormErrorMessage;

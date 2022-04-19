import React from "react";

function FormErrorMessage({ message }) {
  return (
    <section className="text-sm font-semibold text-red-500">{message}</section>
  );
}

export default FormErrorMessage;

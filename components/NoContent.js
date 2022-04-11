import React from "react";

const NoContent = ({ text }) => {
  return (
    <div className="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 mx-auto text-sky-800"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default NoContent;

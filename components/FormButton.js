import React from "react";

const FormButton = ({ desc, onClick }) => {
    return (
        <button className="w-3/4 h-12 rounded bg-cyan-400 text-white hover:cursor-pointer" onClick={onClick}>
            {desc}
        </button>
    );
}

export default FormButton;
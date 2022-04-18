import React from "react";

const TextEditor = () => {
  return (
    <div>
      <textarea
        placeholder="조리 방법을 입력해주세요 🍳"
        className="w-[500px] h-[200px] resize-none border rounded-md"
      ></textarea>
    </div>
  );
};

export default TextEditor;

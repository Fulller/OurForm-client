import { useRef, useEffect } from "react";
import ".scss";

function TextArea({ value, handleTextChange, placeholder, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const textarea = ref.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      const initialHeight = textarea.scrollHeight;
      if (initialHeight > textarea.clientHeight) {
        textarea.style.height = `${initialHeight}px`;
      }
    }
  }, [value]);
  return (
    <textarea
      ref={ref}
      className={"textarea-cpn " + className}
      value={value}
      onChange={handleTextChange}
      rows={1}
      placeholder={placeholder}
      spellCheck={false}
    />
  );
}

export default TextArea;

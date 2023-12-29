import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useCallback } from "react";
import ".scss";

function TextEditor({ value, handleTextChange, placeholder, className = "" }) {
  const quillRef = useRef(null);
  const handleRef = useCallback((ref) => {
    if (!ref) return;
    const quill = ref.getEditor();
    quill.root.setAttribute("spellcheck", false);
    quillRef.current = ref;
  }, []);
  return (
    <ReactQuill
      ref={handleRef}
      className={"text-editor-cpn " + className}
      value={value}
      placeholder={placeholder}
      onChange={handleTextChange}
      modules={{
        toolbar: false,
      }}
      spellCheck={false}
    />
  );
}

export default TextEditor;

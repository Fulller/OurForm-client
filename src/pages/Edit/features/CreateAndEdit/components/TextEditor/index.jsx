import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useEffect } from "react";
import ".scss";

function TextEditor({ value, handleTextChange, placeholder, className = "" }) {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor && editor.root) {
        editor.root.setAttribute("spellcheck", false);
      }
    }
  }, []);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ];
  return (
    <ReactQuill
      ref={quillRef}
      className={"text-editor-cpn " + className}
      value={value}
      placeholder={placeholder}
      onChange={handleTextChange}
      modules={{
        toolbar: toolbarOptions,
      }}
    />
  );
}

export default TextEditor;

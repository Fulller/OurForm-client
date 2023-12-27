import { useEffect, useState } from "react";

function useFocus(ref, defaultFocus = false) {
  const [isFocus, setIsFocus] = useState(defaultFocus);
  useEffect(() => {
    let refElement = ref.current;

    function handleClickOnside() {
      setIsFocus(true);
    }

    function handleClickOutside(event) {
      if (refElement && !refElement.contains(event.target)) {
        setIsFocus(false);
      }
    }

    if (refElement) {
      refElement.addEventListener("click", handleClickOnside);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (refElement) {
        refElement.removeEventListener("click", handleClickOnside);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [isFocus, setIsFocus];
}

export default useFocus;

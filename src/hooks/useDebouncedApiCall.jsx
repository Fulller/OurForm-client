import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";

function useDebouncedApiCall(apiCall, delay = 1000) {
  const debouncedApiCall = useRef(debounce(apiCall, delay)).current;
  useEffect(() => {
    return () => {
      debouncedApiCall.cancel();
    };
  }, [debouncedApiCall]);
  return debouncedApiCall;
}
export default useDebouncedApiCall;

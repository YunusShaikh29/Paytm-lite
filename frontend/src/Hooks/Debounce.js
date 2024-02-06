import { useEffect, useState } from "react";

const useDebounce = (inputVal, delay) => {
  const [debounceVal, setDebounceVal] = useState(inputVal);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceVal(inputVal);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, inputVal]);
  return debounceVal;
};

export default useDebounce
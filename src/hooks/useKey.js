import { useEffect } from "react";

export function useKey(code, handler) {
  useEffect(() => {
    function handelPressKey(e) {
      if (e.code.toLowerCase() === code.toLowerCase()) {
        handler();
      }
    }
    document.addEventListener("keydown", handelPressKey);
    return () => document.removeEventListener("keydown", handelPressKey);
  }, [code, handler]);
}

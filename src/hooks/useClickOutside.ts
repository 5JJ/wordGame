import { useEffect, useRef } from "react";

type callbackType = () => void;

export default function useClickOutside<T extends HTMLElement>(
  callback: callbackType
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, callback]);

  return ref;
}

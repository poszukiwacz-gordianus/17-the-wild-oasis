import { useEffect, useRef } from "react";

export default function useCloseOnOutsideInteraction(
  handler,
  event = "click",
  listenCapturing = true
) {
  const ref = useRef();

  useEffect(() => {
    function handleEvent(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener(event, handleEvent, listenCapturing);

    return () =>
      document.removeEventListener(event, handleEvent, listenCapturing);
  }, [handler, ref, listenCapturing, event]);

  return ref;
}

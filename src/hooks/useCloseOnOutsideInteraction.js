import { useEffect, useRef } from "react";

export default function useCloseOnOutsideInteraction(
  handler,
  options = [{ event: "click", listenCapturing: true }]
) {
  const ref = useRef();

  useEffect(() => {
    function handleEvent(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    options.map((option) =>
      document.addEventListener(
        option.event,
        handleEvent,
        option.listenCapturing
      )
    );

    return () =>
      options.map((option) =>
        document.removeEventListener(
          option.event,
          handleEvent,
          option.listenCapturing
        )
      );
  }, [handler, ref, options]);

  return ref;
}

import { useEffect, useState, useRef } from "react";

export default function useChangeBackgroundOnScroll(targetRef, color) {
  const [shouldChangeBackground, setShouldChangeBackground] = useState(false);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        const targetElement = targetRef.current;
        const targetOffsetTop = targetElement.offsetTop;
        const targetHeight = targetElement.offsetHeight - 400;
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;
        const targetPosition = targetOffsetTop - scrollPosition;
        const threshold = viewportHeight / 10;
        const targetInView =
          targetPosition <= threshold &&
          targetPosition >= -targetHeight + threshold;
        setShouldChangeBackground(targetInView);
      }, 100);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = shouldChangeBackground ? color : "white";
    body.style.color = shouldChangeBackground ? "white" : "black";
  }, [shouldChangeBackground, color]);

  return shouldChangeBackground;
}

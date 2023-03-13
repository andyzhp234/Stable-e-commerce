import React, { useEffect } from "react";

export default function useScrollPanel(ref) {
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.pageYOffset;
      if (
        ref.current &&
        ref.current.offsetTop - scroll < window.innerHeight &&
        ref.current &&
        ref.current.offsetTop - scroll > window.innerHeight
      ) {
        document.body.style.backgroundColor = "#003E1F";
        document.body.style.color = "white";
      } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);
}

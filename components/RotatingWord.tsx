"use client";

import { useEffect, useState } from "react";

export default function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setI((v) => (v + 1) % words.length);
      setAnimate(true);
    }, 3200);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span key={i} className={"rot" + (animate ? " swap" : "")}>
      {words[i]}
    </span>
  );
}

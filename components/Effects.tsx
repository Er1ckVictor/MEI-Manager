"use client";

import { useEffect } from "react";

/**
 * Efeitos visuais sem estado: elementos que aparecem ao rolar, números que contam,
 * luz que segue o mouse nos cartões e inclinação 3D do print do topo.
 * O conteúdo continua visível sem JavaScript e com "reduzir movimento" ativo.
 */
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    const counted = new WeakSet<Element>();
    const countUp = (el: HTMLElement) => {
      if (counted.has(el) || reduce) return;
      counted.add(el);
      const end = Number(el.dataset.count);
      const sep = el.hasAttribute("data-sep");
      const dur = 1400;
      let t0 = 0;
      const tick = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / dur);
        const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = sep ? v.toLocaleString("pt-BR") : String(v);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const show = (el: HTMLElement) => {
      el.classList.add("revealed");
      el.classList.remove("pending");
      el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
      if (el.id === "steps") el.style.setProperty("--line-p", "1");
    };

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target as HTMLElement); io.unobserve(e.target); } }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      const vh = window.innerHeight;
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top > vh * 0.92) {
          el.classList.add("pending");
          if (el.id === "steps") el.style.setProperty("--line-p", "0");
        }
        io.observe(el);
      });
      cleanups.push(() => io.disconnect());
    } else {
      reveals.forEach(show);
    }

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
    cards.forEach((c) => {
      const move = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      };
      c.addEventListener("pointermove", move);
      cleanups.push(() => c.removeEventListener("pointermove", move));
    });

    const stage = document.getElementById("stage");
    const device = document.getElementById("device");
    if (stage && device && !reduce && window.matchMedia("(pointer: fine)").matches) {
      const move = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        device.style.setProperty("--ry", (x * 6).toFixed(2) + "deg");
        device.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg");
      };
      const leave = () => {
        device.style.setProperty("--ry", "0deg");
        device.style.setProperty("--rx", "0deg");
      };
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", leave);
      cleanups.push(() => { stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", leave); });
    }

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}

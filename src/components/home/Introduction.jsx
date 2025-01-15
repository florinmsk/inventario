"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

import { twMerge } from "tailwind-merge";

import ChipTitle from "./ChipTitle";

const text = `Our solution simplifies workflows, improves efficiency, and eliminates complexity, making inventory management seamless and stress-free for teams across any department.`;
const words = text.split(" ");

export default function Introduction() {
  const scrollTarget = useRef();
  const [currentWord, setCurrentWord] = useState(0);
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(latest);
    });
  }, [wordIndex]);

  return (
    <section className="py-24" id="introduction">
      <div className="container max-w-5xl mx-auto">
        <div className="sticky top-36">
          <div className="flex justify-center">
            <ChipTitle title="Introducing Inventario" />
          </div>
          <div className="text-3xl md:text-5xl lg:text-6xl text-center font-medium mt-10">
            <span>Managing products wastes valuable time.&nbsp;</span>
            <span className="text-white/15 text-pretty">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={twMerge(
                    "transition duration-500 text-white/15",
                    wordIndex < currentWord && "text-white"
                  )}
                >{`${word} `}</span>
              ))}
            </span>
            <span className="text-accent block">
              That&apos;s why we built Inventario.
            </span>
          </div>
        </div>
        <div className="h-[150vh]" ref={scrollTarget}></div>
      </div>
    </section>
  );
}

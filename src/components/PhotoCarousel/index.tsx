"use client";

import React, { useState, useEffect, useRef, CSSProperties } from "react";
import Image from "next/image";

interface PhotoCarouselProps {
  images: string[];
  width?: number;
  height?: number;
  autoPlayInterval?: number;
  slideDuration?: number;
  returnDuration?: number;
}

export default function PhotoCarousel({
  images,
  width = 290,
  height = 430,
  autoPlayInterval = 2000,
  slideDuration = 200,
  returnDuration = 800,
}: PhotoCarouselProps) {
  const lastIndex = images.length - 1;
  const [index, setIndex] = useState(0);
  const [isReturning, setIsReturning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReturning) return;
    const newTranslate = -index * width;
    if (containerRef.current) {
      containerRef.current.style.transition = `transform ${slideDuration}ms linear`;
      containerRef.current.style.transform = `translateX(${newTranslate}px)`;
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "";
        }
      }, slideDuration);
    }
  }, [index, width, isReturning, slideDuration]);

  useEffect(() => {
    if (isReturning) return;

    let timer: NodeJS.Timeout;
    if (index < lastIndex) {
      timer = setTimeout(() => {
        setIndex(index + 1);
      }, autoPlayInterval);
    } else {
      timer = setTimeout(() => {
        startContinuousReturn();
      }, autoPlayInterval);
    }

    return () => clearTimeout(timer);
  }, [index, isReturning, lastIndex, autoPlayInterval]);

  const startContinuousReturn = () => {
    if (!containerRef.current) return;
    setIsReturning(true);
    containerRef.current.style.transition = `transform ${returnDuration}ms ease-out`;
    containerRef.current.style.transform = `translateX(0px)`;

    setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.style.transition = "";
      setIsReturning(false);
      setIndex(0);
    }, returnDuration);
  };

  const containerStyle: CSSProperties = {
    width: `${images.length * width}px`,
    height: `${height}px`,
    display: "flex",
    transform: `translateX(${-index * width}px)`,
  };

return (
  <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
    <div
      className="relative overflow-hidden rounded-3xl select-none"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div ref={containerRef} style={containerStyle}>
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <Image
              src={src}
              alt={`Photo ${i + 1}`}
              fill
              className="object-cover rounded-3xl"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
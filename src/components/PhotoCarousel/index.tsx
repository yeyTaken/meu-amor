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
  width = 420,
  height = 620,
  autoPlayInterval = 2000,
  slideDuration = 200,
  returnDuration = 800,
}: PhotoCarouselProps) {
  const lastIndex = images.length - 1;
  const [index, setIndex] = useState(0);
  const [isReturning, setIsReturning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isReturning) return;
    const newTranslate = -index * width;
    setPrevTranslate(newTranslate);
    setCurrentTranslate(newTranslate);
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [index, width, isReturning]);

  const animate = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${currentTranslate}px)`;
    }
    if (isDragging) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isReturning) return;
    setIsDragging(true);
    setStartX(e.clientX);
    if (containerRef.current) containerRef.current.style.transition = "none";
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isReturning) return;
    const currentX = e.clientX;
    const delta = currentX - startX;
    setCurrentTranslate(prevTranslate + delta);
  };
  const handleMouseUp = () => {
    if (isDragging) finishDrag();
  };
  const handleMouseLeave = () => {
    if (isDragging) finishDrag();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isReturning) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (containerRef.current) containerRef.current.style.transition = "none";
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isReturning) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - startX;
    setCurrentTranslate(prevTranslate + delta);
  };
  const handleTouchEnd = () => {
    if (isDragging) finishDrag();
  };

  const finishDrag = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    const threshold = width / 4;

    if (movedBy < -threshold && index < lastIndex) {
      setIndex(index + 1);
    } else if (movedBy > threshold && index > 0) {
      setIndex(index - 1);
    } else {
      if (containerRef.current) {
        containerRef.current.style.transition = "transform 0.3s ease-out";
        containerRef.current.style.transform = `translateX(${prevTranslate}px)`;
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "";
          }
        }, 300);
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [isDragging, currentTranslate]);

  useEffect(() => {
    if (isDragging || isReturning) return;
    if (containerRef.current) {
      containerRef.current.style.transition = `transform ${slideDuration}ms linear`;
      containerRef.current.style.transform = `translateX(${prevTranslate}px)`;
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "";
        }
      }, slideDuration);
    }
  }, [prevTranslate, isDragging, isReturning, slideDuration]);

  useEffect(() => {
    if (isDragging || isReturning) return;

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
  }, [index, isDragging, isReturning, lastIndex, autoPlayInterval]);

  const startContinuousReturn = () => {
    if (!containerRef.current) return;
    setIsReturning(true);
    const endTranslate = 0;
    containerRef.current.style.transition = `transform ${returnDuration}ms ease-out`;
    containerRef.current.style.transform = `translateX(${endTranslate}px)`;

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
    <div className="flex items-center justify-center h-screen">
      <div
        className="relative overflow-hidden rounded-3xl select-none"
        style={{ width: `${width}px`, height: `${height}px` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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

"use client";

import { useEffect, useRef } from 'react';
import { FaHeart } from 'react-icons/fa';
import { createRoot } from 'react-dom/client';

import styles from './index.module.css';

const HeartTrail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lastTimeRef = useRef<number>(0)

useEffect(() => {
  const container = containerRef.current
  if (!container) return

  const THROTTLE = 50

  const renderHeart = (x: number, y: number) => {
    const now = performance.now()
    if (now - lastTimeRef.current < THROTTLE) return
    lastTimeRef.current = now

    const heartDiv = document.createElement('div')
    heartDiv.className = styles.heartIcon
    heartDiv.style.left = `${x}px`
    heartDiv.style.top = `${y}px`

    const iconRoot = createRoot(heartDiv)
    iconRoot.render(<FaHeart className={styles.heart} />)

    const handleAnimationEnd = () => {
      iconRoot.unmount()
      heartDiv.removeEventListener('animationend', handleAnimationEnd)
      container.removeChild(heartDiv)
    }

    heartDiv.addEventListener('animationend', handleAnimationEnd)
    container.appendChild(heartDiv)
  }

  const onMouseMove = (e: MouseEvent) => {
    renderHeart(e.clientX, e.clientY)
  }

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      renderHeart(touch.clientX, touch.clientY)
    }
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('touchmove', onTouchMove)

  return () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('touchmove', onTouchMove)
  }
}, [])


  return <div ref={containerRef} className={styles.trailContainer} />
}

export default HeartTrail

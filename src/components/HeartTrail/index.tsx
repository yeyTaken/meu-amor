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

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      const THROTTLE = 50
      if (now - lastTimeRef.current < THROTTLE) return
      lastTimeRef.current = now

      const x = e.clientX
      const y = e.clientY

      // Cria um container temporário para o ícone
      const heartDiv = document.createElement('div')
      heartDiv.className = styles.heartIcon
      heartDiv.style.left = `${x}px`
      heartDiv.style.top = `${y}px`

      // Criar root para renderizar ícone React em DOM
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

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <div ref={containerRef} className={styles.trailContainer} />
}

export default HeartTrail

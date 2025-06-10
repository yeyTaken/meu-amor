"use client";

import { FaHeart, FaGift } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [showButton, setShowButton] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => setIsVisible(false), 1500); // Tempo para a animação completar
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <AnimatePresence>
        {!isOpening ? (
          !showButton ? (
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut"
                }}
              >
                <FaHeart className="text-red-500 text-4xl" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                <FaHeart className="text-red-500 text-4xl" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              >
                <FaHeart className="text-red-500 text-4xl" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.button
              onClick={handleClick}
              className="px-6 py-3 border-2 border-red-500 text-red-500 bg-transparent rounded-lg flex items-center gap-2 hover:bg-[#120b0b] transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Abrir <FaGift />
            </motion.button>
          )
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.2, 0.8, 1.5],
              opacity: [1, 0.8, 0]
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
            onAnimationComplete={() => setIsVisible(false)}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                ease: "backInOut"
              }}
            >
              <FaGift className="text-red-500 text-6xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -50 }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
              className="text-red-500 text-xl mt-4"
            >
              ❤️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
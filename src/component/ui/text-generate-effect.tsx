"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export const TextGenerateEffect = ({ words }: { words: string }) => {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Reset displayed words
    setDisplayedWords([]);
    
    let currentIndex = 0;
    
    intervalRef.current = setInterval(() => {
      if (currentIndex < wordsArray.length) {
        setDisplayedWords((prev) => [...prev, wordsArray[currentIndex]]);
        currentIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [words]);

  return (
    <span>
      {displayedWords.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

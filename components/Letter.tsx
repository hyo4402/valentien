import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONFESSION_MESSAGE } from '../constants';

interface LetterProps {
  onComplete: () => void;
}

const Letter: React.FC<LetterProps> = ({ onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= CONFESSION_MESSAGE.length) {
      setTimeout(onComplete, 1000);
      return;
    }

    const currentLineText = CONFESSION_MESSAGE[currentLineIndex];

    // If line is empty (spacer), just skip
    if (currentLineText.length === 0) {
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, ""]);
        setCurrentLineIndex(prev => prev + 1);
        setCharIndex(0);
      }, 500);
      return;
    }

    if (charIndex < currentLineText.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) newLines[currentLineIndex] = "";
          newLines[currentLineIndex] = currentLineText.slice(0, charIndex + 1);
          return newLines;
        });
        setCharIndex(prev => prev + 1);
      }, 40); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // Line finished
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCharIndex(0);
      }, 300); // Pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, charIndex, onComplete]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-40 max-w-lg w-full mx-4 bg-[#fffaf0] p-8 md:p-12 rounded-sm shadow-2xl paper-texture"
      style={{
        backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px)',
        backgroundSize: '100% 2em',
        lineHeight: '2em'
      }}
    >
      <div className="font-serif text-gray-800 text-lg md:text-xl leading-loose">
        {displayedLines.map((line, i) => (
          <div key={i} className="min-h-[2em] whitespace-pre-wrap">
            {line}
            {i === currentLineIndex && i < CONFESSION_MESSAGE.length && (
              <span className="inline-block w-0.5 h-5 bg-romantic-500 animate-pulse ml-1 align-middle"/>
            )}
          </div>
        ))}
      </div>
      
      {/* Decorative stamp/signature area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLineIndex >= CONFESSION_MESSAGE.length ? 1 : 0 }}
        className="mt-8 text-right font-handwriting text-3xl text-romantic-600"
      >
        Your Secret Admirer
      </motion.div>
    </motion.div>
  );
};

export default Letter;
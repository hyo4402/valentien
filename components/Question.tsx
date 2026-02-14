import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface QuestionProps {
  onYes: () => void;
}

const Question: React.FC<QuestionProps> = ({ onYes }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const moveButton = () => {
    setIsHovered(true);
    const newX = Math.random() * 200 - 100; // -100 to 100
    const newY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-50 flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.h1 
        className="font-handwriting text-5xl md:text-7xl text-white mb-12 drop-shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Will you be my Valentine?
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="px-12 py-4 bg-white text-romantic-600 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-colors border-2 border-transparent hover:border-romantic-200"
        >
          YES ❤️
        </motion.button>

        <motion.button
          onMouseEnter={moveButton}
          onClick={moveButton} // Mobile fallback
          animate={isHovered ? { x: noButtonPosition.x, y: noButtonPosition.y } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="px-12 py-4 bg-transparent border-2 border-white/50 text-white rounded-full font-bold text-xl backdrop-blur-sm"
        >
          NO 💔
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Question;
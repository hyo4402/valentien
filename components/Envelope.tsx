import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Delay the actual state change to allow animation to play
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center perspective-1000">
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative cursor-pointer group"
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
      >
        {/* Envelope Container */}
        <div className="relative w-72 h-48 md:w-96 md:h-64 bg-romantic-700 rounded-lg shadow-2xl flex items-end justify-center z-10">
          
          {/* Paper inside (Initial preview) */}
          <motion.div 
             className="absolute w-[90%] h-[90%] bg-white rounded-md shadow-md z-0 top-2"
             animate={isOpen ? { y: -100 } : { y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Envelope Flap (Top) */}
          <motion.div
            className="absolute top-0 w-0 h-0 border-l-[9rem] md:border-l-[12rem] border-r-[9rem] md:border-r-[12rem] border-t-[6rem] md:border-t-[8rem] border-l-transparent border-r-transparent border-t-romantic-800 rounded-t-lg origin-top z-30"
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Envelope Pocket (Left) */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[6rem] md:border-t-[8rem] border-b-[6rem] md:border-b-[8rem] border-l-[10rem] md:border-l-[13rem] border-t-transparent border-b-romantic-600 border-l-romantic-600 rounded-bl-lg z-20 pointer-events-none" />

          {/* Envelope Pocket (Right) */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[6rem] md:border-t-[8rem] border-b-[6rem] md:border-b-[8rem] border-r-[10rem] md:border-r-[13rem] border-t-transparent border-b-romantic-600 border-r-romantic-600 rounded-br-lg z-20 pointer-events-none" />

          {/* Envelope Pocket (Bottom) */}
          <div className="absolute bottom-0 w-full h-1/2 bg-romantic-600 z-20 rounded-b-lg pointer-events-none" />

          {/* Heart Seal */}
          <motion.div 
            className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-red-600 rounded-full shadow-lg flex items-center justify-center">
                <span className="text-white text-2xl">❤️</span>
              </div>
              <motion.div 
                className="absolute inset-0 bg-red-400 rounded-full -z-10"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Text Hint */}
          <motion.p 
            className="absolute -bottom-16 text-white/80 font-serif text-lg tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Click to open
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Envelope;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX } from 'lucide-react';

import Background from './components/Background';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import Question from './components/Question';
import { AppStage } from './types';
import { EASTER_EGG_MESSAGE } from './constants';

// Using a reliable public domain classical piece (Gymnopédie No. 1)
const MUSIC_URL = "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e4/Gymnopedie_No_1.ogg/Gymnopedie_No_1.ogg.mp3";

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Easter Egg Handler
  const handleGlobalClick = () => {
    setClickCount(prev => prev + 1);
  };

  useEffect(() => {
    if (clickCount === 5) {
      setShowEasterEgg(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500'] // Gold colors
      });
    }
  }, [clickCount]);

  // Intro Sequence
  useEffect(() => {
    if (stage === AppStage.INTRO) {
      const timer = setTimeout(() => {
        setStage(AppStage.ENVELOPE);
      }, 4000); // 4 seconds intro text
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnvelopeOpen = () => {
    setStage(AppStage.READING);
  };

  const handleLetterComplete = () => {
    setStage(AppStage.QUESTION);
  };

  const handleYes = () => {
    setStage(AppStage.SUCCESS);
    // Trigger Explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffa500', '#ff69b4']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffa500', '#ff69b4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-romantic-900 via-purple-900 to-romantic-800 text-white selection:bg-romantic-300 selection:text-romantic-900"
      onClick={handleGlobalClick}
    >
      <Background />
      
      {/* Audio Control */}
      <button 
        onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
        className="fixed top-6 right-6 z-[60] p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        onError={() => console.log("Audio load error")}
      />

      {/* Main Content Area */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          
          {/* STAGE: INTRO */}
          {stage === AppStage.INTRO && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <h1 className="font-serif text-3xl md:text-5xl italic tracking-wider font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                I have something to tell you...
              </h1>
            </motion.div>
          )}

          {/* STAGE: ENVELOPE */}
          {stage === AppStage.ENVELOPE && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ scale: 2, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Envelope onOpen={handleEnvelopeOpen} />
            </motion.div>
          )}

          {/* STAGE: READING */}
          {stage === AppStage.READING && (
            <motion.div
              key="reading"
              className="w-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Letter onComplete={handleLetterComplete} />
            </motion.div>
          )}

          {/* STAGE: QUESTION */}
          {stage === AppStage.QUESTION && (
            <motion.div
              key="question"
              className="w-full h-full flex items-center justify-center"
            >
              <Question onYes={handleYes} />
            </motion.div>
          )}

          {/* STAGE: SUCCESS */}
          {stage === AppStage.SUCCESS && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center z-50 p-8 bg-black/30 backdrop-blur-sm rounded-xl"
            >
              <h1 className="font-handwriting text-6xl md:text-8xl mb-6 text-romantic-200 drop-shadow-lg">
                I knew you'd say Yes! ❤️
              </h1>
              <p className="font-serif text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                Thank you for making me the happiest person in the world. <br/>
                Happy Valentine's Day!
              </p>
              <motion.div 
                className="mt-12 text-5xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                💑
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* EASTER EGG OVERLAY */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-0 right-0 mx-auto w-max px-6 py-3 bg-white/90 text-romantic-900 rounded-full shadow-lg z-[100] font-bold text-center"
            onClick={(e) => {e.stopPropagation(); setShowEasterEgg(false)}}
          >
            {EASTER_EGG_MESSAGE}
            <span className="block text-xs font-normal opacity-70">(Click to dismiss)</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
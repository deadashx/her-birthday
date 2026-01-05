import React, { useState, useEffect } from 'react';
import catPic from './assets/cat.png'; 
import cozyCat from './assets/cozy.png'; 
import winkCat from './assets/wink.png'; 
import kittyPlane from './assets/kitty.png'; 
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const BackgroundParticles = () => {
  const particleColors = ['#ff8fa3', '#ffd6a5', '#9bf6ff', '#ffffff'];
  return (
    <div className="particle-layer">
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 6 + 2; 
        return (
          <div 
            key={i} 
            className="colourful-particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: particleColors[i % particleColors.length],
              animationDuration: `${Math.random() * 5 + 7}s`,
              animationDelay: `${Math.random() * -10}s`,
              opacity: Math.random() * 0.5 + 0.2 
            }} 
          />
        );
      })}
    </div>
  );
};

function App() {
  const [step, setStep] = useState('loading'); 

  useEffect(() => {
    const timer = setTimeout(() => setStep('greeting'), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleFlyAway = () => {
    setStep('flying');
    // Matches the 3.2s animation speed
    setTimeout(() => setStep('songs'), 3200); 
  };

  const smoothTransition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };

  const getFloatAnim = (delay) => ({
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay 
    }
  });

  return (
    <div className="app-wrapper">
      {step !== 'loading' && <BackgroundParticles />}

      <AnimatePresence mode="wait">
        {step === 'loading' && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={smoothTransition} className="center-content-wrapper">
            <div className="snow-floor" />
            {[...Array(35)].map((_, i) => (
              <div key={i} className="snow" style={{ 
                left: `${Math.random() * 100}%`, 
                animationDuration: `${Math.random() * 4 + 6}s`,
                animationDelay: `${Math.random() * -10}s` 
              }} />
            ))}
            <div className="center-content">
              <motion.img src={catPic} className="premium-cat" initial={{ x: "-120vw" }} animate={{ x: ["-120vw", "0vw", "120vw"] }} transition={{ duration: 5, ease: "easeInOut" }} />
              <h1 className="bday-text">Happy Birthday! 🎂</h1>
              <div className="leslie-dedication"><p className="leslie-handwritten">For Leslie 07 Feb 2026</p></div>
            </div>
          </motion.div>
        )}

        {step === 'greeting' && (
          <motion.div key="greeting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={smoothTransition} className="final-screen-container">
            <div className="content-wrapper">
              <p className="mini-title">a little birthday thought...</p>
              <h1 className="main-title">Hey Kid!</h1>
              <div className="white-message-box">
                <div className="box-dots"><span className="dot pink"></span><span className="dot yellow"></span><span className="dot cyan"></span></div>
                <motion.img src={cozyCat} className="sticker-cat-left" animate={getFloatAnim(0)} />
                <motion.img src={winkCat} className="sticker-cat-right" animate={getFloatAnim(1.5)} />
                <p>I wanted to do a tiny something for your birthday, because you mean a lot to me.</p>
                <p className="tap-text">Tap below, okay? 👋</p>
                <button className="gift-button" onClick={() => setStep('letter')}>See What's Inside <span>→</span></button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={smoothTransition} className="final-screen-container">
            <div className="content-wrapper">
              <p className="mini-title">Wrapped straight from my heart</p>
              <div className="letter-paper">
                <div className="letter-content"><p className="letter-text">Dear Leslie...</p></div>
                <button className="fly-button" onClick={handleFlyAway}>Blast Off! 🚀</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'flying' && (
          <motion.div key="flying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="plane-scene">
             <div className="star-field">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="star" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
              ))}
            </div>
            <div className="plane-container">
              <motion.img 
                src={kittyPlane} 
                className="kitty-plane-img"
                initial={{ x: "-100vw", y: "10vh", rotate: 10 }} 
                animate={{ x: "100vw", y: "-10vh", rotate: -10 }} 
                transition={{ duration: 3.2, ease: "easeInOut" }} 
              />
            </div>
          </motion.div>
        )}

        {step === 'songs' && (
          <motion.div key="songs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={smoothTransition} className="final-screen-container">
            <div className="content-wrapper scrollable-content">
              <h2 className="song-header">Songs for You 🎵</h2>
              <div className="song-card"><h3>Treehouse</h3><p>Your Favorite 🏠</p></div>
              <div className="hard-work-note"><p>I hope u like it 💖</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

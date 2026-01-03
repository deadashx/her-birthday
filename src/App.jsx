import React, { useState, useEffect } from 'react';
import catPic from './assets/cat.png'; 
import cozyCat from './assets/cozy.png'; 
import winkCat from './assets/wink.png'; 
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [step, setStep] = useState('loading'); 
  const particleColors = ['#ff8fa3', '#ffd6a5', '#9bf6ff', '#ffffff'];

  useEffect(() => {
    const timer = setTimeout(() => setStep('greeting'), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleFlyAway = () => {
    setStep('flying');
    setTimeout(() => setStep('songs'), 2500); 
  };

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="popLayout">
        {step === 'loading' && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className="center-content-wrapper">
            <div className="cloud cloud1" /><div className="cloud cloud2" /><div className="snow-floor" />
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
          <motion.div key="greeting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="final-screen-container">
            {/* Added Particles for Screen 2 */}
            {[...Array(25)].map((_, i) => (
              <div key={i} className="colourful-particle" style={{ 
                left: `${Math.random() * 100}%`, 
                backgroundColor: particleColors[i % particleColors.length],
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * -10}s`
              }} />
            ))}
            <div className="content-wrapper">
              <p className="mini-title">a little birthday thought...</p>
              <h1 className="main-title">Hey Kid!</h1>
              <div className="white-message-box">
                <div className="box-dots"><span className="dot pink"></span><span className="dot yellow"></span><span className="dot cyan"></span></div>
                <img src={cozyCat} className="sticker-cat-left" alt="" />
                <img src={winkCat} className="sticker-cat-right" alt="" />
                <p>I wanted to do a tiny something for your birthday, because you mean a lot to me.</p>
                <p className="tap-text">Tap below, okay? 👋</p>
                <button className="gift-button" onClick={() => setStep('letter')}>See What's Inside <span>→</span></button>
              </div>
              <p className="footer-credit">Built this instead of doing my actual work. Enjoy! ✨</p>
            </div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="final-screen-container">
            <div className="content-wrapper">
              <p className="mini-title">Wrapped straight from my heart</p>
              <div className="letter-paper">
                <div className="letter-content">
                  <p className="letter-text">Dear Leslie...</p>
                </div>
                <button className="fly-button" onClick={handleFlyAway}>Send to the stars ✈️</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'flying' && (
          <motion.div key="flying" className="plane-scene">
            <div className="star-field">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="star"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
            {/* Centered Plane Container */}
            <div className="plane-container">
              <motion.div 
                className="paper-plane"
                initial={{ scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  scale: [1, 0.7, 0.2], 
                  rotate: [0, -15, -45], 
                  x: [0, 100, 1000], 
                  y: [0, -50, -600], 
                  opacity: [1, 1, 0] 
                }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              >
                ✈️
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 'songs' && (
          <motion.div key="songs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="final-screen-container">
            <div className="content-wrapper scrollable-content">
              <p className="mini-title">Soft, warm & full of feeling</p>
              <h2 className="song-header">Songs for You 🎵</h2>
              <div className="song-card">
                <div className="song-info">
                  <h3>Treehouse</h3>
                  <p>Your Favorite 🏠</p>
                </div>
              </div>
              <div className="hard-work-note">
                <p>I made it all by myself! I hope u like it 💖</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

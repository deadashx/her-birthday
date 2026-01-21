import React, { useState, useEffect } from 'react';
import catPic from './assets/cat.png'; 
import cozyCat from './assets/cozy.png'; 
import winkCat from './assets/wink.png'; 
import kittyPlane from './assets/kitty.png'; 
import cakeGif from './assets/cake.gif';
import blownGif from './assets/blown.gif';
import smilingCat from './assets/smiling.gif';
import clouds from './assets/clouds.png';
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.jpg';
import treehouseAudio from './assets/treehouse.mp3';
import treehouseImg from './assets/treehouse.png';
import audio505 from './assets/505.mp3';
import img505 from './assets/505.png';
import mineAllMineAudio from './assets/mine all mine.mp3';
import mineAllMineImg from './assets/mine all mine.png';
import loveMeNotAudio from './assets/love me not.mp3';
import loveMeNotImg from './assets/love me not.png';
import heheAudio from './assets/Hehe.mp3';
import heheImg from './assets/Hehe.png';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const BackgroundParticles = () => {
  const particleColors = ['#ff8fa3', '#ffd6a5', '#9bf6ff', '#ffffff'];
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particleCount = prefersReduced ? 0 : (isMobile ? 6 : 10);
  return (
    <div className="particle-layer">
      {[...Array(particleCount)].map((_, i) => {
        const size = Math.random() * 5 + 2;
        return (
          <div
            key={i}
            className="colourful-particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: particleColors[i % particleColors.length],
              animationDuration: `${Math.random() * 4 + 8}s`,
              animationDelay: `${Math.random() * -8}s`,
              opacity: Math.random() * 0.4 + 0.2,
            }}
          />
        );
      })}
    </div>
  );
};

function App() {
  const [step, setStep] = useState('loading'); 
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [showMeow, setShowMeow] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.useRef(null);
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const flakeCount = prefersReduced ? 10 : (isMobile ? 20 : 28);
  const starCount = prefersReduced ? 20 : (isMobile ? 40 : 60);

  const songs = [
    {
      title: 'Treehouse',
      subtitle: 'This one feels like u',
      audio: treehouseAudio,
      image: treehouseImg
    },
    {
      title: '505',
      subtitle: 'this one just makes sense',
      audio: audio505,
      image: img505
    },
    {
      title: 'Mine All Mine',
      subtitle: 'another one u love- and yeah i get why   ',
      audio: mineAllMineAudio,
      image: mineAllMineImg
    },
    {
      title: 'Love Me Not',
      subtitle: 'I thought i should add one from my playlist too',
      audio: loveMeNotAudio,
      image: loveMeNotImg
    },
    {
      title: 'Hehe',
      subtitle: 'Dont mind this, idk why i added it ehehehe. go down ⬇️',
      audio: heheAudio,
      image: heheImg
    }
  ];

  const snowFlakes = React.useMemo(() => 
    [...Array(flakeCount)].map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 3 + 7}s`,
      delay: `${Math.random() * -10}s`
    }))
  , [flakeCount]);

  useEffect(() => {
    // Fallback transition in case animation callback doesn't fire
    const timer = setTimeout(() => {
      setStep((prev) => (prev === 'loading' ? 'greeting' : prev));
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step !== 'loading') {
      setShowMeow(false);
      return undefined;
    }
    const start = setTimeout(() => setShowMeow(true), 2000);
    const end = setTimeout(() => setShowMeow(false), 3500);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [step]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || step !== 'songs') return;

    const handleEnded = () => {
      if (currentSongIndex < songs.length - 1) {
        const nextIndex = currentSongIndex + 1;
        setCurrentSongIndex(nextIndex);
        // Load and play next song
        const nextSong = songs[nextIndex];
        if (nextSong) {
          audio.src = nextSong.audio;
          audio.load();
          setTimeout(async () => {
            try {
              await audio.play();
              setIsPlaying(true);
            } catch (err) {
              console.error('Auto-play failed:', err);
              setIsPlaying(false);
            }
          }, 100);
        }
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, songs, step]);


  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // Make sure audio is ready
        if (!audio.src) {
          const songUrl = songs[currentSongIndex]?.audio;
          if (songUrl) {
            audio.src = songUrl;
            audio.load();
          }
        }
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        } else {
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error('Play error:', err.message);
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    // Request fullscreen on mobile for better experience
    if (window.innerWidth <= 768) {
      const requestFullscreen = async () => {
        if (document.documentElement.requestFullscreen) {
          try {
            await document.documentElement.requestFullscreen();
          } catch (err) {
            // Fullscreen may not be supported or user denied
          }
        }
      };
      // Try to request fullscreen on first interaction
      const handleFirstInteraction = () => {
        requestFullscreen();
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
      document.addEventListener('touchstart', handleFirstInteraction);
    }
  }, []);

  useEffect(() => {
    // Auto-scroll down when candle is blown
    if (isBlown && step === 'cake') {
      setTimeout(() => {
        const scrollWrapper = document.querySelector('.cake-scrollable-wrapper');
        if (scrollWrapper) {
          scrollWrapper.scrollTo({
            top: scrollWrapper.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 500);
    }
  }, [isBlown, step]);

  const handleFlyAway = () => {
    setStep('flying');
    setTimeout(() => setStep('songs'), 3200); 
  };

  const smoothTransition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };

  const getFloatAnim = (delay) => ({
    y: [0, -8, 0],
    transition: {
      duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: delay 
    }
  });

  return (
    <div className="app-wrapper">
      {step !== 'loading' && step !== 'cake' && <BackgroundParticles />}

      <AnimatePresence mode="wait">
        {step === 'loading' && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={smoothTransition} className="center-content-wrapper">
            <img src={clouds} className="loading-clouds" alt="Clouds" />
            <div className="snow-floor" />
            {snowFlakes.map((flake) => (
              <div key={flake.key} className="snow" style={{ 
                left: flake.left, 
                animationDuration: flake.duration,
                animationDelay: flake.delay
              }} />
            ))}
            <div className="center-content cat-with-bubble">
              <motion.img 
                src={catPic} 
                className="premium-cat" 
                initial={{ x: "-120vw" }} 
                animate={{ x: ["-120vw", "0vw", "0vw", "120vw"] }} 
                transition={{
                  duration: 4.5,
                  times: [0, 0.444, 0.778, 1],
                  ease: [[0.22, 1, 0.36, 1], "linear", [0.64, 0, 0.78, 0]]
                }}
                onAnimationComplete={() => setStep((prev) => (prev === 'loading' ? 'greeting' : prev))}
              />
              <AnimatePresence>
                {showMeow && (
                  <motion.div
                    className="meow-bubble"
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -6 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    Meow!
                  </motion.div>
                )}
              </AnimatePresence>
              <h1 className="bday-text">Happy Birthday!!! 🎂</h1>
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
                <p>I wanted to do a tiny something for ur birthday, because u mean a lot to me, ik this isn't much but still..</p>
                <p className="tap-text">Tap below, okay? </p>
                <button className="gift-button" onClick={() => setStep('letter')}>See What's Inside <span>→</span></button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={smoothTransition} className="final-screen-container">
            <div className="content-wrapper letter-screen">
              <AnimatePresence mode="wait">
                {!isEnvelopeOpen ? (
                  <motion.div 
                    key="envelope"
                    className="env-container"
                    onClick={() => setIsEnvelopeOpen(true)}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="env-back">
                      <div className="env-flap"></div>
                      <div className="env-front"></div>
                    </div>
                    <p className="tap-hint">Tap the envelope to open 💌</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="letter"
                    className="big-letter-paper"
                    initial={{ opacity: 0, scale: 0.85, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="paper-content">
                      <p className="letter-handwritten">Dear Leslie...</p>
                      <p className="letter-body">
                        I know u really like handmade gifts, and i wish i could give u one in person, but u've to live this far duh 😑 So i made this instead. </p>
                        <p className="letter-body">
                        its kind of dumb, but i thought u'd like it. -and also yes, this counts as handmade. Just.... digitally heheheh.
                      </p>                                                                                                



                    </div>
                    <button className="fly-button" onClick={handleFlyAway}>
                      Blast Off! 🚀
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
          <motion.div key="songs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={smoothTransition} className="final-screen-container songs-screen">
            <audio 
              ref={audioRef} 
              crossOrigin="anonymous" 
              preload="auto"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onDurationChange={(e) => setDuration(e.currentTarget.duration)}
              onEnded={() => {
                if (currentSongIndex < songs.length - 1) {
                  setCurrentSongIndex(currentSongIndex + 1);
                } else {
                  setIsPlaying(false);
                }
              }}
            />
            <div className="content-wrapper">
              <h2 className="song-header">The good stuff 🎵</h2>
              
              <div className="songs-container">
                {songs.map((song, index) => (
                  <motion.div 
                    key={index}
                    className={`song-card ${currentSongIndex === index ? 'active' : ''}`}
                    onClick={async () => {
                      setCurrentSongIndex(index);
                      const audio = audioRef.current;
                      if (audio) {
                        audio.src = songs[index].audio;
                        audio.load();
                        setTimeout(async () => {
                          try {
                            await audio.play();
                            setIsPlaying(true);
                          } catch (err) {
                            console.error('Play failed:', err);
                          }
                        }, 100);
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="song-image-box">
                      <img src={song.image} alt={song.title} />
                    </div>
                    
                    <div className="song-info">
                      <h3 className="song-title">{song.title}</h3>
                      <p className="song-subtitle">{song.subtitle}</p>
                      
                      {currentSongIndex === index && (
                        <div className="player-controls">
                          <button className="play-btn" onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause();
                          }}>
                            {isPlaying ? '⏸' : '▶'}
                          </button>
                          
                          <div className="progress-container">
                            <input 
                              type="range" 
                              className="progress-bar"
                              min="0"
                              max="100"
                              value={duration ? (currentTime / duration) * 100 : 0}
                              onChange={handleProgressChange}
                            />
                          </div>
                          
                          <span className="time-display">{formatTime(currentTime)} / {formatTime(duration)}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="hard-work-note">
                <p>I hope u like it 💖</p>
                <button className="gift-button" onClick={() => setStep('cake')} style={{marginTop: '20px'}}>Continue →</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'cake' && (
          <motion.div 
            key="cake" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={smoothTransition} 
            className="cake-screen"
          >
            <div className="stars-background">
              {[...Array(starCount)].map((_, i) => (
                <div 
                  key={i} 
                  className="night-star" 
                  style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2 + 0.5}px`,
                    height: `${Math.random() * 2 + 0.5}px`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 1.5 + 2.5}s`
                  }} 
                />
              ))}
            </div>
            
            <div className="cake-scrollable-wrapper">
              <div className="cake-decorations">
                <div className="moon"></div>
                <div className="moonlight-beam"></div>
              </div>
              <motion.h2 
                className="memories-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Memories
              </motion.h2>
              <div className="stickers-cards-section">
                <motion.div 
                  className="sticker-card sticker-card-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <motion.img 
                    src={pic1} 
                    className="sticker-card-img"
                    animate={getFloatAnim(0)}
                  />
                  <div className="sticker-card-text">
                    <p className="sticker-label">Had to include this one ✨</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="sticker-card sticker-card-right"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="sticker-card-text">
                    <p className="sticker-label">I really like this picture </p>
                  </div>
                  <motion.img 
                    src={pic2} 
                    className="sticker-card-img"
                    animate={getFloatAnim(1.2)}
                  />
                </motion.div>

                <motion.div 
                  className="sticker-card sticker-card-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.img 
                    src={pic3} 
                    className="sticker-card-img"
                    animate={getFloatAnim(0.6)}
                  />
                  <div className="sticker-card-text">
                    <p className="sticker-label">This smile though</p>
                  </div>
                </motion.div>
              </div>

              <div className="cake-section">
                <motion.h1 
                  className="birthday-handwritten"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  Happy Birthday Cutie!
                </motion.h1>

                <div className="polaroid-stickers">
                  <motion.div className="polaroid-sticker polaroid-left" animate={getFloatAnim(0)}>
                    <img src={pic4} alt="photo" />
                  </motion.div>
                  <motion.div className="polaroid-sticker polaroid-right" animate={getFloatAnim(1.2)}>
                    <img src={pic5} alt="photo" />
                  </motion.div>
                </div>

                <motion.div 
                  className="cake-container"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  onClick={() => setIsBlown(true)}
                >
                  <img 
                    src={isBlown ? blownGif : cakeGif} 
                    alt="Birthday Cake" 
                    className="cake-gif"
                  />
                </motion.div>

                {!isBlown && (
                  <motion.p 
                    className="blow-instruction"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    Tap to blow the candle 🕯️
                  </motion.p>
                )}

                {isBlown && (
                  <motion.p 
                    className="blown-message"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    🎉 Make a wish! 🎉
                  </motion.p>
                )}

                {isBlown && (
                  <motion.button 
                    className="gift-button"
                    onClick={() => setStep('final')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    One More Thing →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'final' && (
          <motion.div 
            key="final" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={smoothTransition} 
            className="final-letter-screen"
          >
            <motion.div
              className="final-letter-container"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="grand-finale">the grand finale...</p>
              <h1 className="final-title">One More Thing</h1>
              
              <div className="final-letter-box">
                <motion.img 
                  src={smilingCat} 
                  alt="Smiling Cat" 
                  className="smiling-cat"
                  animate={getFloatAnim(0)}
                />
                
                <div className="final-letter-content">
  <div className="heart-icon">💖</div>
  <h2 className="final-letter-title">Final Thoughts</h2>
  
  <p className="letter-greeting">Hey!!!!,</p>

  <p className="final-letter-text">
    As this little journey comes to an end, I wanted to leave you with a few real thoughts 💗
  </p>

  <p className="final-letter-text">
    First of all, I'm so glad I joined that MC server that day,
  </p>

  <p className="final-letter-text">
    RANDOM BUT I'm still curious about that diary of yours... maybe one day you'll let me peek 👀
  </p>

  <p className="final-letter-text">
    And i really hope you like this little thing I made. It took 7 cups of coffee and some late nights, so you better be smiling right now 🔫
  </p>

  <p className="final-letter-text">
    You're one of a kind, and yeah, some lucky guy is gonna have you.
  </p>

  <p className="final-letter-text">
    So happy to celebrate you today...
  </p>

  <p className="final-letter-text">
    But also, FUCK U because you still haven't sent me that church pic.
  </p>

  <p className="final-letter-text">
    I'm actually still mad about it 🥀 
  </p>

  <p className="final-letter-text">
    Just saying 💖
  </p>

  <p className="final-letter-text">
    Yours,
  </p>
  <p className="final-letter-text">
    loyal Kitten~
  </p>
                  
                  <div className="final-buttons">
                    <button className="seal-button" onClick={() => setStep('loading')}>Restart 🔄</button>
                  </div>
                  <p className="github-link-text">
                    also if u wan checkout the code for this u can go here{' '}
                    <a href="https://github.com/deadashx/her-birthday" target="_blank" rel="noopener noreferrer">https://github.com/deadashx/her-birthday</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
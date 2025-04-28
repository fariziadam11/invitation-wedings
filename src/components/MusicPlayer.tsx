import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  audioUrl: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const playPromise = audioRef.current?.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(updateProgress);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        onPlay={() => {
          setIsPlaying(true);
          animationRef.current = requestAnimationFrame(updateProgress);
        }}
        onPause={() => {
          setIsPlaying(false);
          if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
          }
        }}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current?.currentTime || 0);
        }}
        onDurationChange={() => {
          setDuration(audioRef.current?.duration || 0);
        }}
      />

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-rose-600 text-white rounded-full p-3 shadow-lg hover:bg-rose-700 transition-colors"
          aria-label="Music controls"
        >
          <Music size={20} />
        </button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl p-4 w-64"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-800 font-medium">Background Music</h3>
                <button
                  onClick={togglePlay}
                  className="bg-rose-100 text-rose-700 rounded-full p-2 hover:bg-rose-200 transition-colors"
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>

              <div className="mb-3">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.01}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration ? formatTime(duration) : '--:--'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setVolume(0);
                    if (audioRef.current) {
                      audioRef.current.volume = 0;
                    }
                  }}
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 rounded-full bg-gray-200 appearance-none cursor-pointer accent-rose-600"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MusicPlayer;

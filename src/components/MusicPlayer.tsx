import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  audioUrl: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-play is often blocked by browsers, so we set it up but don't rely on it
    const playPromise = audioRef.current?.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Auto-play was prevented, keep the player paused
          setIsPlaying(false);
        });
    }
  }, []);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop />
      
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setShowControls(!showControls)}
          className="bg-rose-600 text-white rounded-full p-3 shadow-lg hover:bg-rose-700 transition-colors"
          aria-label="Music controls"
        >
          <Music size={20} />
        </button>
        
        {showControls && (
          <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl p-4 flex items-center space-x-3 animate-fade-in">
            <p className="text-gray-800 text-sm">Background Music</p>
            <button 
              onClick={togglePlay}
              className="bg-rose-100 text-rose-700 rounded-full p-2 hover:bg-rose-200 transition-colors"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
import { useState, useRef } from 'react';

/**
 * Custom hook for the TCAI Dashboard to handle audio playback
 * of synthesized scripts with word-level highlighting.
 */

interface WordAlignment {
  word: string;
  start: number;
  end: number;
}

export const useTTSPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playWithSync = (audioUrl: string, alignments: WordAlignment[]) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);

      const updateHighlight = () => {
        if (!audioRef.current) return;
        const currentTime = audioRef.current.currentTime;
        
        const activeIndex = alignments.findIndex(
          a => currentTime >= a.start && currentTime <= a.end
        );
        
        if (activeIndex !== -1) {
          setCurrentWordIndex(activeIndex);
        }

        if (!audioRef.current.paused) {
          requestAnimationFrame(updateHighlight);
        }
      };

      requestAnimationFrame(updateHighlight);
    }
  };

  const stop = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setCurrentWordIndex(null);
  };

  return { isPlaying, currentWordIndex, playWithSync, stop, audioRef };
};
import React, { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import audioFile from "../assets/win.wav"

function useConfetti() {
  const [confettiShow, setConfettiShow] = useState(false);
  const [isActivable, setActivable] = useState(false);
  const song = useMemo(() => {
    const audio = new Audio(audioFile);
    audio.volume = 0.6;
    
    return audio;
  }, []);
  song.volume = 0.5;

  const handleAudioEnded = () => {
    setActivable(false);
    setConfettiShow(false);
  };

  useEffect(() => {
    const playAudio = () => {
      if (isActivable) {
        song.play();
      } else {
        song.pause();
      }
    };

    song.addEventListener("ended", handleAudioEnded);
    playAudio();

    // Pulisci l'ascoltatore di eventi e metti in pausa l'audio quando il componente viene smontato
    return () => {
      song.removeEventListener("ended", handleAudioEnded);
      song.pause();
    };
  }, [isActivable,song]);

  const toggleConfetti = () => {
    setActivable(!isActivable);
    setConfettiShow(!confettiShow);
  };
  

  return {
    ConfettiCustom: confettiShow ? Confetti : React.Fragment,
    confettiShow,
    toggleConfetti,
  };
}

export default useConfetti;

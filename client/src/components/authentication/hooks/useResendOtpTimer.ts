import { useEffect, useState } from "react";

interface UseResendTimer {
  isResendDisabled: boolean;
  timeLeft: number;
  startTimer: () => void;
  formatTime: (seconds: number) => string;
}

export default function useResendTimer(duration = 120): UseResendTimer {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResendDisabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (timeLeft === 0) {
      setIsResendEnabled(false);
    }
  }, [timeLeft]);

  const startTimer = () => {
    setTimeLeft(duration);
    setIsResendEnabled(true);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    isResendDisabled,
    timeLeft,
    startTimer,
    formatTime,
  };
}

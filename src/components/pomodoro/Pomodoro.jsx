import React, { useState, useEffect } from 'react';
import alarmSoundFile from '../../assets/alarm.mp3'; // Adjust path if necessary

const Pomodoro = () => {
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isRinging, setIsRinging] = useState(false);

  // Create a single instance of the alarm sound
  const alarmSound = React.useRef(new Audio(alarmSoundFile));

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alarmSound.current.loop = true;
      alarmSound.current.play();
      setIsRinging(true);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStartPause = () => {
    if (isRinging) return; // Prevent starting the timer while ringing
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    if (isRunning) {
      // If the timer is running, stop it and reset the countdown
      setIsRunning(false);
      setTimeLeft(workDuration * 60); // Set it to work duration by default
    } else {
      // If the timer is not running, switch between work and break mode
      setIsWorkMode((prev) => !prev);
      setTimeLeft((isWorkMode ? breakDuration : workDuration) * 60);
    }
  };

  const stopAlarm = () => {
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0; // Reset sound
    setIsRinging(false);
    setTimeLeft((isWorkMode ? breakDuration : workDuration) * 60);
    setIsWorkMode((prev) => !prev); // Switch mode
  };

  return (
    <div className="w-full h-full bg-white/10 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-white">
        {isWorkMode ? 'Work Time' : 'Break Time'}
      </h2>
      <p className="text-6xl font-bold text-white my-4">{`${Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}</p>

      <div className="flex space-x-4">
        {!isRinging ? (
          <button
            onClick={handleStartPause}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
        ) : (
          <button
            onClick={stopAlarm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Stop Alarm
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Reset
        </button>
      </div>

      <div className="mt-6">
        <div className="flex flex-col space-y-2">
          <label className="text-white">
            Work Duration:
            <input
                type="number"
                min="1"
                value={workDuration || ''}
                onChange={(e) => setWorkDuration(e.target.value ? Number(e.target.value) : '')}
                onBlur={() => setWorkDuration((prev) => (prev ? prev : 1))}
                className="ml-2 p-1 rounded bg-white/20 text-gray-300 appearance-none no-spin"
            />
          </label>
          <label className="text-white">
            Break Duration:
            <input
                type="number"
                min="1"
                value={breakDuration || ''}
                onChange={(e) => setBreakDuration(e.target.value ? Number(e.target.value) : '')}
                onBlur={() => setBreakDuration((prev) => (prev ? prev : 1))}
                className="ml-2 p-1 rounded bg-white/20 text-gray-300 appearance-none no-spin"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;

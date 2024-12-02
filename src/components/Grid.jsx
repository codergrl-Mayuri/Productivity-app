import React from 'react';
import ToDo from './todo/ToDo';
import Notes from './notes/Notes';
import Weather from './weather/Weather';
import Music from './music/Music';
import Pomodoro from './pomodoro/Pomodoro';

const Grid = () => {
  return (
    <div className="grid grid-rows-4 grid-cols-4 gap-3 h-[calc(100vh-50px)] relative">
      {/* ToDo (Large Square) */}
      <div className="col-span-2 row-span-2 rounded-lg p-2 flex items-center justify-center bg-white/10 backdrop-blur-sm">
        <ToDo />
      </div>

      {/* Music (Rectangle) */}
      <div className="col-span-2 row-span-1 rounded-lg p-2 flex items-center justify-center bg-white/10 backdrop-blur-md">
        <Music />
      </div>

      {/* Weather (Rectangle) */}
      <div className="col-span-2 row-span-1 rounded-lg p-2 flex items-center justify-center bg-white/10 backdrop-blur-md">
        <Weather />
      </div>

      {/* Notes (Large Square) */}
      <div className="col-span-2 row-span-2 rounded-lg p-2 flex items-center justify-center bg-white/10 backdrop-blur-md">
        <Notes />
      </div>

      {/* Pomodoro (Large Square) */}
      <div className="col-span-2 row-span-2 rounded-lg p-2 flex items-center justify-center bg-white/10 backdrop-blur-md">
        <Pomodoro />
      </div>
    </div>
  );
};

export default Grid;

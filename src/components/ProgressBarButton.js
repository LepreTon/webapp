import React from 'react';

const ProgressBarButton = ({ value, started, disabled, ...props}) => {
  const progressWidth = `${value * 100}%`;

  return (
    <button
      className={(disabled ? "active:bg-red-900" : 'active:bg-neutral-900') + " relative px-4 min-w-[20rem] py-[2rem] rounded-[2rem] w-full md:w-80 border-2 border-yellow-400 text-white mx-10 cursor-pointer z-20 overflow-hidden select-none"}
      disabled={disabled}
      {...props}
    >
      <span className="absolute text-2xl font-bold font-['Bookman_Old_Style'] top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-30 select-none">{started ? "Claim" : "Start Mining"}</span>
      <div
        className="absolute top-0 left-0 h-full bg-claim-green rounded-xl transition-all duration-300 select-none"
        style={{ width: progressWidth }}
      />
      <span className="absolute text-xl font-['Bookman_Old_Style'] top-1/2 right-3 transform -translate-x-1/2 -translate-y-1/2 z-30 select-none">{value}</span>
    </button>
  );
};

export default ProgressBarButton;

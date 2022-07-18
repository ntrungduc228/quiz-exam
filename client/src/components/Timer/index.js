import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

const Completionist = () => (
  <span className="text-danger" style={{ fontSize: '20px' }}>
    Hết giờ!
  </span>
);

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  // console.log('fsd', props);
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span className="text-danger" style={{ fontSize: '20px' }}>
        {days !== '00' ? '' : zeroPad(days) + ':'}
        {hours !== '00' ? '' : zeroPad(hours) + ':'}
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  }
};

const Timer = ({ minutes, onComplete, timeRemain }) => {
  return (
    <Countdown
      date={timeRemain ? timeRemain : Date.now() + minutes * 60 * 1000}
      renderer={renderer}
      onComplete={() => {
        onComplete();
        alert('Hết giờ!');
      }}
    />
  );
};

export default Timer;

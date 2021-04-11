import React, {useState, useEffect} from 'react';
// put front facing modules here

export default () => {
  // React Hook (functional component)
  const [currentTime, setCurrentTime] = useState(0);

  // python example api
  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);


  return (
    // login module and dashboard component here
    <p>The current time is {currentTime}</p>
    // this is the example to remove later
  );
};
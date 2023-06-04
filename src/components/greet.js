import React, { useEffect, useState } from "react";

export default function Greet() {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good Morning");
    } else if (currentTime >= 12 && currentTime < 16) {
      setGreeting("Good Afternoon");
    } else if(currentTime >=16 && currentTime<20){
        setGreeting("Good Evening");
    }
    else {
      setGreeting("Good Night");
    }

    setTime(currentTime);
  }, []);

  return <h1>{greeting}!</h1>;
}

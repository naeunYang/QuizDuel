import { useState, useEffect } from "react";
import "./Timer.css";
import { TimerOff } from "lucide-react";

export default function Timer() {
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="Timer">
      {time === 0 ? (
        <div>
          <div className={"time timeout"}>
            <TimerOff />
          </div>
          <div className="footer">시간종료</div>
        </div>
      ) : (
        <div>
          <div className={"time"}>{time}</div>
          <div className="footer">초 남음</div>
        </div>
      )}
    </div>
  );
}

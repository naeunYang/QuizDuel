import { useState, useEffect } from "react";
import "./Timer.css";
import { TimerOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useTimeOver } from "@/stores/useTimeOver";

export default function Timer({ timeLimit }: { timeLimit: string }) {
  const [time, setTime] = useState<number | null>(null);
  const { setTimeOver } = useTimeOver();

  // Name 값 추출
  const getValue = async () => {
    try {
      const { data: time_master, error } = await supabase
        .from("time_master")
        .select("timeName")
        .eq("seq", timeLimit);

      const timeName = time_master?.map((item) => item.timeName)[0];
      if (error) throw error;

      setTime(Number(timeName.slice(0, -1)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getValue();
  }, []);

  useEffect(() => {
    if (time === null) return;
    if (time <= 0) {
      setTimeOver(true);
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev! - 1);
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

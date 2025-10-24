import { useEffect, useState } from "react";
import AnswerMultiple from "./AnswerMultiple";
import AnswerOX from "./AnswerOX";
import "./QuizContent.css";
import Solution from "./Solution";
import { useCurrentQuizStore } from "@/stores/useCurrentQuizStore";
import { supabase } from "@/lib/supabaseClient";
import type { QuizData } from "@/components/adminPage/types/quizdata.types";
import { useTimeOver } from "@/stores/useTimeOver";

export default function QuizContent({ quizIdList }: { quizIdList: string[] }) {
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const { currentIndex } = useCurrentQuizStore();
  const { isTimeOver } = useTimeOver();

  const fetchCurrentQuiz = async () => {
    try {
      const { data, error } = await supabase
        .from("quiz_master")
        .select()
        .eq("id", quizIdList[currentIndex])
        .maybeSingle();

      if (error) throw error;

      setCurrentQuiz(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCurrentQuiz();
  }, []);

  if (!currentQuiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="QuizContent">
      <div className="quiz_number">{currentIndex + 1}번 퀴즈</div>
      <div className="content">
        <Solution
          content={currentQuiz.content}
          explanation={isTimeOver ? currentQuiz.explanation : null}
        />
      </div>
      <div className="answer">
        {currentQuiz.type === "0" ? (
          <AnswerOX answer={isTimeOver ? currentQuiz.answer : null} />
        ) : (
          <AnswerMultiple
            answer={isTimeOver ? currentQuiz.answer : null}
            choices={currentQuiz.choices}
          />
        )}
      </div>
    </div>
  );
}

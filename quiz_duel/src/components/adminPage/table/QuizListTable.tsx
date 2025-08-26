import { useState, useRef, useEffect, useCallback } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../shadcn/table";
import { Checkbox } from "../../shadcn/checkbox";
import { supabase } from "@/lib/supabaseClient";
import QuizListTableRow from "./QuizListTableRow";
import masterData from "../../../masterData.json";

import type { QuizData } from "@/components/homePage/types/quizdata.types";

const QuizListTable = () => {
  const [quizList, setQuizList] = useState<QuizData[]>([]);
  const tableRef = useRef<HTMLTableElement | null>(null);

  // quiz 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from("quiz_master")
          .select(
            `id, type, categoryID, levelID, status, content, explanation, answer, choices`
          )
          .order("id", { ascending: true });

        if (data) {
          const newData = data.map((row) => ({
            ...row,
            isChecked: false,
            type: masterData.types.find((type) => type.typeID === row.type),
            status: masterData.status.find(
              (stat) => stat.statusID === row.status
            ),
          }));

          setQuizList(newData);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchData();
  }, []);

  const onHeaderCheckChange = (isChecked: boolean) => {
    if (isChecked) {
      setQuizList((prev) =>
        prev.map((quiz) => {
          return { ...quiz, isChecked: true };
        })
      );
    } else {
      setQuizList((prev) =>
        prev.map((quiz) => {
          return { ...quiz, isChecked: false };
        })
      );
    }
  };

  const onCheckboxChange = useCallback((targetId: string) => {
    setQuizList((prev) =>
      prev.map((quiz) =>
        quiz.id === targetId ? { ...quiz, isChecked: !quiz.isChecked } : quiz
      )
    );
  }, []);

  return (
    <div className="w-full max-h-full overflow-auto">
      <Table className="table-fixed w-full text-base" ref={tableRef}>
        <TableHeader className="sticky-header">
          <TableRow className="bg-[#f4a896] hover:bg-[#f7b3a0]">
            <TableHead className="w-[2rem] text-center">
              <Checkbox
                className="border-amber-800
               data-[state=checked]:bg-[#5a2e20]"
                onCheckedChange={onHeaderCheckChange}
              />
            </TableHead>
            <TableHead className="w-[6rem] text-center text-amber-800">
              ID
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              문제 형식
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              카테고리
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              난이도
            </TableHead>
            <TableHead className="w-[20rem] text-center  text-amber-800">
              문제
            </TableHead>
            <TableHead className="w-[20rem] text-center  text-amber-800">
              해설
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              정답
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              상태
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizList.map((quiz) => (
            <QuizListTableRow
              key={quiz.id}
              quizData={quiz}
              tableRef={tableRef}
              onCheckboxChange={onCheckboxChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuizListTable;

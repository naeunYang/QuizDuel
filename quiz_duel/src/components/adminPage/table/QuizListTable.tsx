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
import { Spinner } from "@/components/common/LoadingSpinner";

import type { QuizData } from "@/components/adminPage/types/quizdata.types";
import type { SearchInput } from "../types/search-value.types";

const QuizListTable = ({
  searchValue,
}: {
  searchValue: SearchInput | null;
}) => {
  const [quizList, setQuizList] = useState<QuizData[]>([]);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const parentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from("quiz_master")
          .select("*")
          .like("id", `%${searchValue?.id ?? ""}%`)
          .like("type", `%${searchValue?.type ?? ""}%`)
          .like("categoryID", `%${searchValue?.category ?? ""}%`)
          .like("levelID", `%${searchValue?.level ?? ""}%`)
          .like("status", `%${searchValue?.status ?? ""}%`)
          .order("id", { ascending: true });

        if (data) {
          const newData = data.map((row) => ({
            ...row,
            isChecked: false,
          }));

          setQuizList(newData);
          setLoadingVisible(false);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchData();
  }, [searchValue]);

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

  const onUpdateRow = useCallback((row: QuizData) => {
    setQuizList((prev) =>
      prev.map((quiz) =>
        quiz.id === row.id ? { isChecked: quiz.isChecked, ...row } : quiz
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
        <TableBody ref={parentRef}>
          {quizList.map((quiz) => (
            <QuizListTableRow
              key={quiz.id}
              quizData={quiz}
              tableRef={tableRef}
              onCheckboxChange={onCheckboxChange}
              onUpdateRow={onUpdateRow}
            />
          ))}
        </TableBody>
      </Table>
      <Spinner className="text-red-400 w-20 h-20 mt-20" show={loadingVisible} />
    </div>
  );
};

export default QuizListTable;

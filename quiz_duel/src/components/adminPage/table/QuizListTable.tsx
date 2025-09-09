import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useTableRowsCntContext } from "../QuizContent";

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
import { toast } from "sonner";

import type { QuizData } from "@/components/adminPage/types/quizdata.types";
import type { SearchInput } from "../types/search-value.types";
import type { TableRef } from "../types/table-ref.types";

type QuizListTableProps = {
  searchValue: SearchInput | null;
};

// forwardRef<Ref 타입, Props 타입>
const QuizListTable = forwardRef<TableRef, QuizListTableProps>(
  ({ searchValue }, ref) => {
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [loading, setLoading] = useState(true);
    const { setTableRowsCnt } = useTableRowsCntContext();
    const tableRef = useRef<HTMLTableElement | null>(null);
    const popoverCloseRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      // 체크 행 삭제
      onDeleteCheckedRows: () => {
        const checkedIds = quizList
          .filter((quiz) => quiz.isChecked)
          .map((quiz) => quiz.id);
        onDeleteRow(checkedIds);
      },
    }));

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
            setTableRowsCnt(newData.length);
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      };

      fetchData();
    }, [searchValue]);

    // 헤더 체크 컬럼
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

    // 로우 체크
    const onCheckboxChange = useCallback((targetId: string) => {
      setQuizList((prev) =>
        prev.map((quiz) =>
          quiz.id === targetId ? { ...quiz, isChecked: !quiz.isChecked } : quiz
        )
      );
    }, []);

    // 수정
    const onUpdateRow = useCallback(async (row: QuizData) => {
      try {
        const { data, error } = await supabase
          .from("quiz_master")
          .update(row)
          .eq("id", row.id)
          .select();

        if (error) {
          toast.error(`${row.id} 수정 실패`);
          throw error;
        }

        if (data.length > 0) {
          setQuizList((prev) =>
            prev.map((quiz) =>
              quiz.id === row.id ? { isChecked: quiz.isChecked, ...row } : quiz
            )
          );

          popoverCloseRef.current?.click(); // popover 닫기
          toast.success(`${data[0].id} 수정 완료`);
        }
      } catch (error) {
        console.error(error);
        toast.error(`${row.id} 수정 실패`);
        throw error;
      }
    }, []);

    // 삭제
    const onDeleteRow = useCallback(async (rowId: string[]) => {
      if (rowId.length < 1) {
        toast.warning("체크된 행이 없습니다.");
        return;
      }

      try {
        const { error } = await supabase
          .from("quiz_master")
          .delete()
          .in("id", rowId);

        if (error) {
          toast.error(`${rowId} 삭제 실패`);
          throw error;
        }

        setQuizList((prev) => prev.filter((row) => !rowId.includes(row.id)));

        popoverCloseRef.current?.click(); // popover 닫기
        toast.success(`${rowId} 삭제 완료`);
      } catch (error) {
        console.error(error);
        toast.error(`${rowId} 삭제 실패`);
        throw error;
      }
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
                popoverCloseRef={popoverCloseRef}
                onCheckboxChange={onCheckboxChange}
                onUpdateRow={onUpdateRow}
                onDeleteRow={onDeleteRow}
              />
            ))}
          </TableBody>
        </Table>
        <Spinner className="text-red-400 w-20 h-20 mt-50" show={loading} />
        {quizList.length < 1 && loading === false && (
          <div className="w-full h-full text-center mt-50">No Data</div>
        )}
      </div>
    );
  }
);

export default QuizListTable;

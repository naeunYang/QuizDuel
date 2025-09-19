import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/table";
import QuizCreateGridRow from "./QuizCreateGridRow";
import Button from "../common/Button";
import { Button as ShadBtn } from "../shadcn/button";
import ConfirmModal from "../common/ConfirmModal";
import { toast } from "sonner";
import type { QuizData } from "./types/quizdata.types";

interface Props {
  quizList: QuizData[];
  setQuizList: React.Dispatch<React.SetStateAction<QuizData[]>>;
}

export function QuizCreateGrid({ quizList, setQuizList }: Props) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const nav = useNavigate();

  // row 검수 클릭
  const onRowCheckChange = useCallback((seq: number) => {
    setQuizList((prev) =>
      prev.map((quiz) =>
        quiz.seq === seq ? { ...quiz, check: !quiz.check } : quiz
      )
    );
  }, []);

  // const onRowCheckHeaderClick = () => {
  //   setQuizList((prev) => prev.map((item) => ({ ...item, check: "✅" })));
  // };

  // db에서 id max값 구하기 위한 오늘 날씨 추출(yy-mm-dd)
  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear().toString().slice(-2);
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return year + month + day;
  };

  // db에서 id max값 구하기
  const getMaxId = async () => {
    try {
      let maxId;
      const { data } = await supabase
        .from("quiz_master")
        .select("id")
        .like("id", `${getToday()}%`)
        .order("id", { ascending: false })
        .limit(1);

      if (!data) return;

      if (data.length > 0) {
        maxId = data[0].id;
      } else {
        maxId = getToday() + "000";
      }

      return maxId;
    } catch (error) {
      console.error(error);
    }
  };

  // 저장
  const onAddQuizBtnClick = async () => {
    try {
      const maxId = await getMaxId();
      const saveDatas = quizList
        .filter((quiz) => !quiz.check) // 검수 안된 데이터 제외
        .map((quiz, index) => ({
          id: String(Number(maxId) + index + 1),
          type: quiz.type,
          categoryID: quiz.categoryID,
          levelID: quiz.levelID,
          status: "0",
          content: quiz.content,
          explanation: quiz.explanation,
          answer: quiz.answer,
          choices: quiz.choices,
        }));

      if (saveDatas.length < 1) {
        toast.warning("저장할 데이터가 없습니다.");
        return;
      }

      const { error } = await supabase.from("quiz_master").insert(saveDatas);

      if (error) {
        toast.error("저장 실패");
        return;
      }

      toast.success("저장 완료되었습니다.");

      nav("/admin", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="w-full h-full overflow-auto border-1 rounded-lg select-none">
        <Table className="table-fixed w-full text-base" ref={tableRef}>
          <TableHeader className="sticky-header">
            <TableRow className="bg-[#f4a896] hover:bg-[#f7b3a0]">
              <TableHead className="w-[6rem] text-center text-amber-800">
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
              <TableHead
                className="w-[6rem] text-center  text-amber-800"
                // onClick={onRowCheckHeaderClick}
              >
                검수
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizList.map((quiz) => (
              <QuizCreateGridRow
                key={quiz.seq}
                quizData={quiz}
                tableRef={tableRef}
                onRowCheckChange={onRowCheckChange}
                setQuizList={setQuizList}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="footer">
        <ConfirmModal
          title={"📢 저장"}
          content={"저장 하시겠습니까?\n검수가 완료된 문제만 저장됩니다."}
          closeButtonLabel="아니오"
          activeButton={
            <Button
              text="네"
              onButtonClick={onAddQuizBtnClick}
              type="POSITIVE"
            />
          }
          trigger={
            <ShadBtn
              className={
                "bg-[#1ABC9C] hover:bg-[#17a489] active:bg-[#12967b] min-w-20 p-5 text-[1.05rem] cursor-pointer"
              }
            >
              추가하기
            </ShadBtn>
          }
          height={200}
        />
      </div>
    </div>
  );
}

import { useRef } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/table";
import { Checkbox } from "../shadcn/checkbox";

import RowPopover from "./RowPopover";

const quizList = [
  {
    isChecked: false,
    id: "Solution1",
    type: "OX",
    category: "상식",
    level: "하",
    quiz: "지구는 태양 주위를 맴돈다.",
    status: "✅ NORMAL",
  },
  {
    isChecked: true,
    id: "Solution2",
    type: "MULTIPLE",
    category: "만화",
    level: "하",
    quiz: "짱구 엄마의 이름으로 알맞은 것은?",
    status: "✅ NORMAL",
  },
  {
    isChecked: false,
    id: "Solution3",
    type: "OX",
    category: "상식",
    level: "하",
    quiz: "지구는 태양 주위를 맴돈다.",
    status: "✅ NORMAL",
  },
  {
    isChecked: true,
    id: "Solution4",
    type: "OX",
    category: "상식",
    level: "하",
    quiz: "지구는 태양 주위를 맴돈다.",
    status: "✅ NORMAL",
  },
  {
    isChecked: false,
    id: "Solution5",
    type: "OX",
    category: "상식",
    level: "하",
    quiz: "지구는 태양 주위를 맴돈다.",
    status: "🚨 REPORT",
  },
];

const QuizListTable = () => {
  const tableRef = useRef<HTMLTableElement | null>(null);

  return (
    <div className="w-full max-h-full overflow-auto">
      <Table className="table-fixed w-full text-base" ref={tableRef}>
        <TableHeader className="sticky-header">
          <TableRow className="bg-[#f4a896] hover:bg-[#f7b3a0]">
            <TableHead className="w-[2rem] text-center">
              <Checkbox
                className="border-amber-800
               data-[state=checked]:bg-[#5a2e20]"
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
            <TableHead className="w-[40rem] text-center  text-amber-800">
              문제
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              상태
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizList.map((quiz) => (
            <RowPopover
              key={quiz.id}
              tableRef={tableRef}
              trigger={
                <TableRow
                  key={quiz.id}
                  className="hover:bg-[#f2f2f2] cursor-pointer"
                >
                  <TableCell className="w-[3.1rem] text-center">
                    <Checkbox
                      className="border-amber-800 data-[state=checked]:bg-[#5a2e20]"
                      checked={quiz.isChecked}
                    />
                  </TableCell>
                  <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                    {quiz.id}
                  </TableCell>
                  <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                    {quiz.type}
                  </TableCell>
                  <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                    {quiz.category}
                  </TableCell>
                  <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                    {quiz.level}
                  </TableCell>
                  <TableCell className="text-center truncate text-[#5a2e20]">
                    {quiz.quiz}
                  </TableCell>
                  <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                    {quiz.status}
                  </TableCell>
                </TableRow>
              }
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuizListTable;

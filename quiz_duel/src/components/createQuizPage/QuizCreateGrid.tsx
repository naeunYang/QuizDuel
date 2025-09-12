import "./QuizCreateGrid.css";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../shadcn/table";

const mockData = [
  {
    id: 1,
    type: "OX",
    category: "상식",
    level: "하",
    quiz: "지구는 태양 주위를 맴돈다",
    explanation: "네 그렇답니다.",
    answer: "O",
    choices: "O,X",
    check: "✅",
  },
  {
    id: 2,
    type: "OX",
    category: "상식",
    level: "하",
    quiz: "지구는 태양 주위를 맴돈다",
    explanation: "네 그렇답니다.",
    answer: "O",
    choices: "O,X",
    check: "✅",
  },
  {
    id: 3,
    type: "OX",
    category: "상식",
    level: "하",
    quiz: "지구는 태양 주위를 맴돈다",
    explanation: "네 그렇답니다.",
    answer: "O",
    choices: "O,X",
    check: "✅",
  },
];

export function QuizCreateGrid() {
  return (
    <div className="w-full h-full overflow-auto">
      <Table className="table-fixed w-full text-base">
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
              선택지
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              정답
            </TableHead>
            <TableHead className="w-[6rem] text-center  text-amber-800">
              검수
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((data) => (
            <TableRow
              key={data.id}
              className="hover:bg-[#f2f2f2] cursor-pointer"
            >
              <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                {data.id}
              </TableCell>
              <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                {data.type}
              </TableCell>
              <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                {data.category}
              </TableCell>
              <TableCell className="w-[6rem] text-center text-[#5a2e20]">
                {data.level}
              </TableCell>
              <TableCell className="text-center truncate text-[#5a2e20]">
                {data.quiz}
              </TableCell>
              <TableCell className="text-center truncate text-[#5a2e20]">
                {data.explanation}
              </TableCell>
              <TableCell className="text-center truncate text-[#5a2e20]">
                {data.answer}
              </TableCell>
              <TableCell className="text-center truncate text-[#5a2e20]">
                {data.check}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

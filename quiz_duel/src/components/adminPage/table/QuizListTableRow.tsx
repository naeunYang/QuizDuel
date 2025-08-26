import { memo } from "react";

import { TableRow, TableCell } from "@/components/shadcn/table";
import { Checkbox } from "@/components/shadcn/checkbox";
import RowPopover from "./RowPopover";

import type { QuizData } from "@/components/homePage/types/quizdata.types";

interface Props {
  quizData: QuizData;
  tableRef: React.RefObject<HTMLTableElement | null>;
  onCheckboxChange: (targetId: string) => void;
}

const QuizListTableRow = ({ quizData, tableRef, onCheckboxChange }: Props) => {
  return (
    <RowPopover
      key={quizData.id}
      tableRef={tableRef}
      quizData={quizData}
      trigger={
        <TableRow
          key={quizData.id}
          className="hover:bg-[#f2f2f2] cursor-pointer"
        >
          <TableCell className="w-[3.1rem] text-center">
            <Checkbox
              className="border-amber-800 data-[state=checked]:bg-[#5a2e20]"
              checked={quizData.isChecked}
              onCheckedChange={() => onCheckboxChange(quizData.id)}
              onClick={(e) => e.stopPropagation()} // 부모 이벤트 전파 차단
            />
          </TableCell>
          <TableCell className="w-[6rem] text-center text-[#5a2e20]">
            {quizData.id}
          </TableCell>
          <TableCell className="w-[6rem] text-center text-[#5a2e20]">
            {quizData.type?.typeName}
          </TableCell>
          <TableCell className="w-[6rem] text-center text-[#5a2e20]">
            {quizData.categoryID}
          </TableCell>
          <TableCell className="w-[6rem] text-center text-[#5a2e20]">
            {quizData.levelID}
          </TableCell>
          <TableCell className="text-center truncate text-[#5a2e20]">
            {quizData.content}
          </TableCell>
          <TableCell className="text-center truncate text-[#5a2e20]">
            {quizData.explanation}
          </TableCell>
          <TableCell className="text-center truncate text-[#5a2e20]">
            {quizData.answer}
          </TableCell>
          <TableCell className="w-[6rem] text-center text-[#5a2e20]">
            {quizData.status?.statusName}
          </TableCell>
        </TableRow>
      }
    />
  );
};

export default memo(QuizListTableRow);

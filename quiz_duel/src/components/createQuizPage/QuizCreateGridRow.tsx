import { memo } from "react";

import { TableRow, TableCell } from "../shadcn/table";
import RowPopover from "./RowPopover";

import type { QuizData } from "./types/quizdata.types";

interface Props {
  quizData: QuizData;
  tableRef: React.RefObject<HTMLTableElement | null>;
  onRowCheckChange: (seq: number) => void;
}

const QuizCreateGridRow = ({ quizData, tableRef, onRowCheckChange }: Props) => {
  // 검수 셀 클릭
  const onCheckCellClick = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    onRowCheckChange(quizData.seq);
    e.stopPropagation();
  };

  return (
    <RowPopover
      key={quizData.seq}
      tableRef={tableRef}
      quizData={quizData}
      trigger={
        <TableRow
          key={quizData.seq}
          className="hover:bg-[#f2f2f2] cursor-pointer"
        >
          <TableCell className="w-[6rem] text-center text-[#5a2e20]">
            {quizData.type}
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
          <TableCell
            className="text-center truncate text-[#5a2e20]"
            onClick={onCheckCellClick}
          >
            {quizData.check}
          </TableCell>
        </TableRow>
      }
    />
  );
};

export default memo(QuizCreateGridRow);

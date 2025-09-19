import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import LabelTextArea from "../common/LabelTextArea";
import LabelInput from "../common/LabelInput";
import { X } from "lucide-react";

import type { QuizData } from "./types/quizdata.types";

interface Props {
  tableRef: React.RefObject<HTMLTableElement | null>;
  quizData: QuizData;
  setQuizList: React.Dispatch<React.SetStateAction<QuizData[]>>;
  trigger: React.ReactElement;
}

export default function RowPopover({
  tableRef,
  quizData,
  setQuizList,
  trigger,
}: Props) {
  // 행에 포커스 주기
  const onOpenChange = (open: boolean) => {
    const rows = tableRef.current!.querySelectorAll("tr");

    if (open) {
      if (!quizData.check) {
        setQuizList((prev) =>
          prev.map((item) =>
            item.seq === quizData.seq ? { ...item, check: true } : item
          )
        );
      }

      rows.forEach((row) => {
        if (row.getAttribute("data-state") === "open") {
          (row as HTMLTableRowElement).style.backgroundColor = "#e5e7eb";
        } else {
          (row as HTMLTableRowElement).style.backgroundColor = "";
        }
      });
    } else {
      rows.forEach((row) => {
        (row as HTMLTableRowElement).style.backgroundColor = "";
      });
    }
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-full" align="start">
        <div className="flex flex-col relative ">
          <div className="flex flex-row gap-2 text-gray-400 text-[15px]">
            <label>{quizData.type === "0" ? "OX 퀴즈" : "객관식 퀴즈"}</label>
            <label>{quizData.categoryID}</label>
            <label>{quizData.levelID}</label>
          </div>
          <div className="flex flex-row relative ">
            <LabelTextArea
              label="문제"
              direction="vertical"
              content={quizData.content}
              width={500}
              height={200}
              name="quiz"
              readonly={true}
            />
            <LabelTextArea
              label="해설"
              direction="vertical"
              content={quizData.explanation}
              width={500}
              height={200}
              name="explanation"
              readonly={true}
            />
          </div>
          <div className="flex flex-row relative ">
            <LabelInput
              label="정답"
              direction="horizontal"
              content={quizData.answer}
              width={465}
              name="answer"
              readonly={true}
            />

            {quizData.type === "1" ? (
              <LabelInput
                label="선택"
                direction="horizontal"
                content={quizData.choices?.join(",")}
                width={465}
                name="choices"
                readonly={true}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="absolute top-0 right-0 ">
            <PopoverClose asChild>
              <button>
                <X className="cursor-pointer w-8" color="#4a2316" />
              </button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

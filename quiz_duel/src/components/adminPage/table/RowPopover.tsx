import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import LabelSelect from "../../common/LabelSelect";
import LabelTextArea from "../../common/LabelTextArea";
import LabelInput from "../../common/LabelInput";
import Button from "../../common/Button";
import { Button as ShadBtn } from "../../shadcn/button";
import ConfirmModal from "../../common/ConfirmModal";
import masterData from "../../../masterData.json";
import { useOptionDataContext } from "../QuizContent";

import type { QuizData } from "@/components/homePage/types/quizdata.types";

interface Props {
  tableRef: React.RefObject<HTMLTableElement | null>;
  quizData: QuizData;
  trigger: React.ReactElement;
}

const RowPopover = ({ tableRef, quizData, trigger }: Props) => {
  const { roomOptions } = useOptionDataContext();

  // 행에 포커스 주기
  const onOpenChange = (open: boolean) => {
    const rows = tableRef.current!.querySelectorAll("tr");

    if (open) {
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
        <div className="flex flex-row">
          <LabelSelect
            label="문제 형식"
            direction="horizontal"
            itemList={masterData.types}
            getValue={(item) => item.typeID}
            getName={(item) => item.typeName}
            width={135}
            name="category"
            content={String(quizData.type?.typeID)}
            onSelectValueChange={() => {}}
          />

          <LabelSelect
            label="카테고리"
            direction="horizontal"
            itemList={roomOptions?.categories}
            getValue={(item) => item.categoryID}
            getName={(item) => item.categoryName}
            width={135}
            name="category"
            content={quizData.categoryID}
            onSelectValueChange={() => {}}
          />
          <LabelSelect
            label="난이도"
            direction="horizontal"
            itemList={roomOptions?.levels}
            getValue={(item) => item.levelID}
            getName={(item) => item.levelName}
            width={100}
            name="level"
            content={quizData.levelID}
            onSelectValueChange={() => {}}
          />
          <LabelSelect
            label="상태"
            direction="horizontal"
            itemList={masterData.status}
            getValue={(item) => item.statusID}
            getName={(item) => item.statusName}
            width={135}
            name="status"
            content={String(quizData.status?.statusID)}
            onSelectValueChange={() => {}}
          />
        </div>
        <div className="flex flex-row gap-0">
          <LabelTextArea
            label="문제"
            direction="horizontal"
            content={quizData.content}
            width={500}
            height={200}
            name="content"
            onTextChange={() => {}}
          />
          <LabelTextArea
            label="해설"
            direction="horizontal"
            content={quizData.explanation}
            width={500}
            height={200}
            name="explanation"
            onTextChange={() => {}}
          />
        </div>
        <div className="flex flex-row gap-0">
          <LabelInput
            label="정답&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            direction="horizontal"
            content={quizData.answer}
            onInputValueChange={() => {}}
            width={500}
          />
          {quizData.choices ? (
            <LabelInput
              label="선택&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
              direction="horizontal"
              content={quizData.choices}
              onInputValueChange={() => {}}
              width={500}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row gap-2 mt-5 justify-center">
          <ConfirmModal
            title="📢 수정"
            content="수정하시겠습니까?"
            closeButtonLabel="아니오"
            activeButton={
              <Button text="네" type="POSITIVE" onButtonClick={() => {}} />
            }
            trigger={
              <ShadBtn
                className={`bg-[#5a2e20] hover:bg-[#7a4531] active:bg-[#4a2316] text-white text-[1rem] font-[100] cursor-pointer w-20`}
              >
                수정
              </ShadBtn>
            }
          />
          <ConfirmModal
            title="📢 삭제"
            content="삭제하시겠습니까?"
            closeButtonLabel="아니오"
            activeButton={
              <Button text="네" type="POSITIVE" onButtonClick={() => {}} />
            }
            trigger={<ShadBtn className={"admin_button w-20"}>삭제</ShadBtn>}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RowPopover;

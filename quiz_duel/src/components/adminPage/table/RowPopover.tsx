import { useState, useContext, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import masterData from "../../../masterData.json";
import { OptionDataContext } from "../QuizContent";

import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import LabelSelect from "../../common/LabelSelect";
import LabelTextArea from "../../common/LabelTextArea";
import LabelInput from "../../common/LabelInput";
import Button from "../../common/Button";
import { Button as ShadBtn } from "../../shadcn/button";
import ConfirmModal from "../../common/ConfirmModal";
import { toast } from "sonner";
import { X } from "lucide-react";

import type { QuizData } from "@/components/adminPage/types/quizdata.types";

interface Props {
  tableRef: React.RefObject<HTMLTableElement | null>;
  quizData: QuizData;
  trigger: React.ReactElement;
  onUpdateRow: (row: QuizData) => void;
}

const RowPopover = ({ tableRef, quizData, trigger, onUpdateRow }: Props) => {
  const [quiz, setQuiz] = useState<QuizData>(quizData);
  const roomOptions = useContext(OptionDataContext);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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
      setQuiz(quizData); // 데이터 초기화
    }
  };

  const onChangeInput = (name: string, value: string) => {
    if (name === "choices") {
      setQuiz((prev) => ({
        ...prev,
        choices: value.split(","),
      }));

      return;
    }

    setQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 수정
  const onUpdateBtnClick = async () => {
    if (JSON.stringify(quizData) === JSON.stringify(quiz)) {
      toast.warning("변경 사항이 없습니다.");
      return;
    }

    try {
      const { isChecked, ...quizData } = quiz;

      const { data, error } = await supabase
        .from("quiz_master")
        .update(quizData)
        .eq("id", quiz.id)
        .select();

      if (error) throw error;

      if (data.length > 0) {
        setQuiz({ isChecked: isChecked, ...data[0] }); // 현재 popover 데이터 세팅
        onUpdateRow(data[0]); // 테이블 row 데이터 세팅

        closeBtnRef.current?.click(); // popover 닫기
        toast.success(`${data[0].id} 수정 완료`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-full" align="start">
        <div className="flex flex-row relative ">
          <LabelSelect
            label="문제 형식"
            direction="horizontal"
            itemList={masterData.types.filter((type) => type.typeID !== "-1")}
            getValue={(item) => item.typeID}
            getName={(item) => item.typeName}
            width={135}
            name="type"
            content={quiz.type}
            onSelectValueChange={onChangeInput}
          />
          <LabelSelect
            label="카테고리"
            direction="horizontal"
            itemList={roomOptions?.categories.filter(
              (category) => category.categoryID !== "-1"
            )}
            getValue={(item) => item.categoryID}
            getName={(item) => item.categoryName}
            width={135}
            name="categoryID"
            content={quiz.categoryID}
            onSelectValueChange={onChangeInput}
          />
          <LabelSelect
            label="난이도"
            direction="horizontal"
            itemList={roomOptions?.levels.filter(
              (level) => level.levelID !== "-1"
            )}
            getValue={(item) => item.levelID}
            getName={(item) => item.levelName}
            width={100}
            name="levelID"
            content={quiz.levelID}
            onSelectValueChange={onChangeInput}
          />
          <LabelSelect
            label="상태"
            direction="horizontal"
            itemList={masterData.status.filter((stat) => stat.stateID !== "-1")}
            getValue={(item) => item.stateID}
            getName={(item) => item.stateName}
            width={135}
            name="status"
            content={quiz.status}
            onSelectValueChange={onChangeInput}
          />
          <div className="absolute top-0 right-0 ">
            <PopoverClose asChild>
              <button ref={closeBtnRef}>
                <X className="cursor-pointer w-8" color="#4a2316" />
              </button>
            </PopoverClose>
          </div>
        </div>
        <div className="flex flex-row gap-0">
          <LabelTextArea
            label="문제"
            direction="horizontal"
            content={quiz.content}
            width={500}
            height={200}
            name="content"
            onTextChange={onChangeInput}
          />
          <LabelTextArea
            label="해설"
            direction="horizontal"
            content={quiz.explanation}
            width={500}
            height={200}
            name="explanation"
            onTextChange={onChangeInput}
          />
        </div>
        <div className="flex flex-row gap-0">
          <LabelInput
            label="정답&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            direction="horizontal"
            content={quiz.answer}
            onInputValueChange={onChangeInput}
            width={500}
            name="answer"
          />
          {quiz.choices ? (
            <LabelInput
              label="선택&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
              direction="horizontal"
              content={quiz.choices.join(",")}
              onInputValueChange={onChangeInput}
              width={500}
              name="choices"
            />
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row gap-2 mt-5 justify-center">
          <ShadBtn
            className={`bg-[#5a2e20] hover:bg-[#7a4531] active:bg-[#4a2316] text-white text-[1rem] font-[100] cursor-pointer w-20`}
            onClick={onUpdateBtnClick}
          >
            수정
          </ShadBtn>
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

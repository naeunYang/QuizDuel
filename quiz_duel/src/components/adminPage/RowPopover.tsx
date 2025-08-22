import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import LabelSelect from "../common/LabelSelect";
import LabelTextArea from "../common/LabelTextArea";
import LabelInput from "../common/LabelInput";
import Button from "../common/Button";
import { Button as ShadBtn } from "../shadcn/button";
import ConfirmModal from "../common/ConfirmModal";

const type = [
  { typeID: "ox", typeName: "OX 퀴즈" },
  { typeID: "multiple", typeName: "객관식 퀴즈" },
];

const categories = [
  { categoryID: "1", categoryName: "하나" },
  { categoryID: "2", categoryName: "둘" },
  { categoryID: "3", categoryName: "셋" },
];

const levels = [
  { levelID: "1", levelName: "하나" },
  { levelID: "2", levelName: "둘" },
  { levelID: "3", levelName: "셋" },
];

const status = [
  { statusID: "normarl", statusName: "✅ NORMAL" },
  { statusID: "report", statusName: "🚨 REPORT" },
];

interface Props {
  tableRef: React.RefObject<HTMLTableElement | null>;
  trigger: React.ReactElement;
}

const RowPopover = ({ tableRef, trigger }: Props) => {
  const onOpenChange = (open: boolean) => {
    const rows = tableRef.current!.querySelectorAll("tr");

    if (open) {
      console.log("현재 선택된 row의 id값: ", trigger.key);

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
            itemList={type}
            getValue={(item) => item.typeID}
            getName={(item) => item.typeName}
            width={135}
            name="category"
            content={type[0]["typeID"]}
            onSelectValueChange={() => {}}
          />

          <LabelSelect
            label="카테고리"
            direction="horizontal"
            itemList={categories}
            getValue={(item) => item.categoryID}
            getName={(item) => item.categoryName}
            width={135}
            name="category"
            content={categories[0]["categoryID"]}
            onSelectValueChange={() => {}}
          />
          <LabelSelect
            label="난이도"
            direction="horizontal"
            itemList={levels}
            getValue={(item) => item.levelID}
            getName={(item) => item.levelName}
            width={100}
            name="level"
            content={levels[0]["levelID"]}
            onSelectValueChange={() => {}}
          />
          <LabelSelect
            label="상태"
            direction="horizontal"
            itemList={status}
            getValue={(item) => item.statusID}
            getName={(item) => item.statusName}
            width={135}
            name="status"
            content={status[0]["statusID"]}
            onSelectValueChange={() => {}}
          />
        </div>
        <div className="flex flex-row gap-0">
          <LabelTextArea
            label="문제"
            direction="horizontal"
            content="지구는 태양 주위를 맴돈다."
            width={500}
            height={200}
          />
          <LabelTextArea
            label="해설"
            direction="horizontal"
            content="네 원래 그렇답니다. 망원경으로 봐 보시던지"
            width={500}
            height={200}
          />
        </div>
        <LabelInput
          label="정답&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          direction="horizontal"
          onInputValueChange={() => {}}
          content="O"
          width={500}
        />
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

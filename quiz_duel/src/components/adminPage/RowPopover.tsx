import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import LabelSelect from "../common/LabelSelect";
import LabelTextArea from "../common/LabelTextArea";
import LabelInput from "../common/LabelInput";

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
  trigger: React.ReactElement;
}

const RowPopover = ({ trigger }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="">
        <div className="flex flex-row gap-5">
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
        <div className="flex flex-row gap-5">
          <LabelTextArea
            label="문제"
            direction="horizontal"
            content="지구는 태양 주위를 맴돈다."
            width={820}
            height={300}
          />
          <LabelTextArea
            label="해설"
            direction="horizontal"
            content="네 원래 그렇답니다. 망원경으로 봐 보시던지"
            width={820}
            height={300}
          />
        </div>
        <LabelInput
          label="정답"
          direction="horizontal"
          onInputValueChange={() => {}}
          content="O"
          width={820}
        />
      </PopoverContent>
    </Popover>
  );
};

export default RowPopover;

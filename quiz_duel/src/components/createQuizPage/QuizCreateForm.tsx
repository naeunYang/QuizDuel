import "./QuizCreateForm.css";

import masterData from "../../masterData.json";

import LabelSelect from "../common/LabelSelect";
import LabelInput from "../common/LabelInput";
import Button from "../common/Button";

export default function QuizCreateForm() {
  return (
    <div className="QuizCreateForm">
      <LabelSelect
        direction="vertical"
        label="문제 형식"
        name="type"
        itemList={masterData.types}
        getName={(item) => item.typeName}
        getValue={(item) => item.typeID}
        width={170}
        content={"0"}
        onSelectValueChange={() => {}}
      />
      <LabelSelect
        direction="vertical"
        label="카테고리"
        name="category"
        itemList={[{ categoryID: "test1", categoryName: "테스트1" }]}
        getName={(item) => item.categoryID}
        getValue={(item) => item.categoryName}
        width={170}
        onSelectValueChange={() => {}}
      />
      <LabelSelect
        direction="vertical"
        label="난이도"
        name="level"
        itemList={[{ levelID: "test1", levelName: "테스트1" }]}
        getName={(item) => item.levelID}
        getValue={(item) => item.levelName}
        width={170}
        onSelectValueChange={() => {}}
      />
      <LabelInput
        direction="vertical"
        label="문제 수"
        width={170}
        type={"number"}
        name="count"
        content={"100"}
        placeholder="개수"
        align="center"
        onInputValueChange={() => {}}
      />
      <Button text="AI 생성" type="POSITIVE" onButtonClick={() => {}} />
    </div>
  );
}

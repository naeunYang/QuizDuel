import "./QuizSearch.css";

import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import { Search } from "lucide-react";

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

const QuizSearch = () => {
  return (
    <div className="QuizSearch">
      <div className="total">
        Total
        <p>500</p>
      </div>
      <LabelInput
        label="ID"
        direction="horizontal"
        content="ABC123"
        onInputValueChange={() => {}}
        width={150}
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
      <section className="search_icon">
        <div>
          <Search />
        </div>
      </section>
    </div>
  );
};

export default QuizSearch;

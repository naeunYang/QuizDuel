import "./QuizCreateForm.css";

import { useState } from "react";
import masterData from "../../masterData.json";
import useOptionFetch from "@/hooks/useOptionFetch";

import LabelSelect from "../common/LabelSelect";
import LabelInput from "../common/LabelInput";
import Button from "../common/Button";
import LoadingModal from "../common/LoadingModal";
import { toast } from "sonner";

import type { QuizData } from "../adminPage/types/quizdata.types";

type QuizInfo = Pick<QuizData, "type" | "categoryID" | "levelID"> & {
  cnt: number;
};

export default function QuizCreateForm() {
  const [loading, setLoading] = useState(false);
  const [quizCondition, setQuizCondition] = useState<QuizInfo>({
    type: "",
    categoryID: "",
    levelID: "",
    cnt: 0,
  });
  const categories = useOptionFetch(
    "category_master",
    "categoryID",
    "categoryName"
  );
  const levels = useOptionFetch("level_master", "levelID", "levelName");

  const onChangeInput = (name: string, value: string | number) => {
    setQuizCondition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    console.log(quizCondition);

    if (quizCondition.cnt <= 0) {
      toast.error(`문제 수를 1개 이상으로 설정해주세요.`);
      return;
    }

    setLoading(true);
  };

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
        content={quizCondition.type}
        onSelectValueChange={onChangeInput}
      />
      <LabelSelect
        direction="vertical"
        label="카테고리"
        name="categoryID"
        itemList={[{ id: "random", value: "전체" }, ...categories]}
        getName={(item) => item.value}
        getValue={(item) => item.id}
        width={170}
        content={quizCondition.categoryID}
        onSelectValueChange={onChangeInput}
      />
      <LabelSelect
        direction="vertical"
        label="난이도"
        name="levelID"
        itemList={[{ id: "random", value: "전체" }, ...levels]}
        getName={(item) => item.value}
        getValue={(item) => item.id}
        width={170}
        content={quizCondition.levelID}
        onSelectValueChange={onChangeInput}
      />
      <LabelInput
        direction="vertical"
        label="문제 수"
        width={170}
        type={"number"}
        name="cnt"
        placeholder="개수"
        align="center"
        content={quizCondition.cnt}
        onInputValueChange={onChangeInput}
      />
      <Button text="AI 생성" type="POSITIVE" onButtonClick={onSubmit} />
      <LoadingModal
        content="문제 생성중..."
        onOpenChange={() => {}}
        open={loading}
        type="LOADING"
      />
    </div>
  );
}

import "./QuizCreateForm.css";

import { useState } from "react";
import masterData from "../../masterData.json";
import useOptionFetch from "@/hooks/useOptionFetch";
import axios from "axios";

import LabelSelect from "../common/LabelSelect";
import LabelInput from "../common/LabelInput";
import Button from "../common/Button";
import LoadingModal from "../common/LoadingModal";
import { toast } from "sonner";

import type { QuizData } from "@/components/createQuizPage/types/quizdata.types";

type QuizInfo = Pick<QuizData, "type" | "categoryID" | "levelID"> & {
  cnt: number;
};

interface Props {
  quizList: QuizData[];
  setQuizList: React.Dispatch<React.SetStateAction<QuizData[]>>;
}

export default function QuizCreateForm({ quizList, setQuizList }: Props) {
  const [loading, setLoading] = useState(false);
  const [quizCondition, setQuizCondition] = useState<QuizInfo>({
    type: "-1",
    categoryID: "random",
    levelID: "random",
    cnt: 1,
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

  const onSubmit = async () => {
    if (quizCondition.cnt <= 0) {
      toast.error(`문제 수를 1개 이상으로 설정해주세요.`);
      return;
    }
    if (quizCondition.cnt > 15) {
      toast.error(`문제 수를 15개 이하로 설정해주세요.`);
      return;
    }

    setLoading(true);

    axios
      .get("/api/admin/createquiz", {
        params: {
          type: quizCondition.type,
          category: quizCondition.categoryID,
          level: quizCondition.levelID,
          cnt: quizCondition.cnt,
        },
      })
      .then((response) => {
        if (!response.data) {
          setLoading(false);
          toast.error("다시 시도해주세요.");
          return;
        }

        const maxSeq = quizList.reduce(
          (max, q) => Math.max(max, q.seq ?? 0),
          0
        );
        setQuizList((prev) => [
          ...prev,
          ...response.data.map((item: QuizData, index: number) => ({
            seq: maxSeq + index + 1,
            ...item,
          })),
        ]);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("다시 시도해주세요.");
      });
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
        open={loading}
        type="LOADING"
        className="[&>button]:hidden "
      />
    </div>
  );
}

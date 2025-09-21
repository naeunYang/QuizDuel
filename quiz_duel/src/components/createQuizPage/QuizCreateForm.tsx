import "./QuizCreateForm.css";

import { useState } from "react";
import masterData from "../../masterData.json";
import useOptionFetch from "@/hooks/useOptionFetch";

import LabelSelect from "../common/LabelSelect";
import LabelInput from "../common/LabelInput";
import Button from "../common/Button";
import LoadingModal from "../common/LoadingModal";
import { toast } from "sonner";
import { Card, CardContent } from "../shadcn/card";

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
  const [loadingContent, setLoadingContent] = useState("");
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

  // AI 생성 버튼 클릭
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
    setLoadingContent("");

    // 연결 생성
    const params = new URLSearchParams({
      type: quizCondition.type,
      category: quizCondition.categoryID,
      level: quizCondition.levelID,
      cnt: String(quizCondition.cnt),
    });
    const evtSource = new EventSource(
      `/api/admin/createquiz?${params.toString()}`
    );

    // 메세지 수신
    evtSource.onmessage = (event) => {
      setLoadingContent((prev) => prev + JSON.parse(event.data));

      if (!event.data) {
        setLoading(false);
        toast.error("다시 시도해주세요.");
        return;
      }
    };

    // 메세지 종료
    evtSource.addEventListener("end", (e) => {
      evtSource.close();
      setLoading(false);

      const data = JSON.parse(e.data);
      const maxSeq = quizList.reduce((max, q) => Math.max(max, q.seq ?? 0), 0);
      setQuizList((prev) => [
        ...prev,
        ...data.map((item: QuizData, index: number) => ({
          seq: maxSeq + index + 1,
          ...item,
        })),
      ]);
    });

    // 메세지 오류
    evtSource.onerror = (error) => {
      console.log(error);
      setLoading(false);
      toast.error("다시 시도해주세요.");
    };
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
        content={
          <div>
            <label>문제 생성중...</label>
            <Card className="h-90 !overflow-auto">
              <CardContent className="!text-left">{loadingContent}</CardContent>
            </Card>
          </div>
        }
        open={loading}
        type="LOADING"
        className="[&>button]:hidden w-200 h-125"
      />
    </div>
  );
}

import Button from "@/components/common/Button";
import LabelInput from "@/components/common/LabelInput";
import LabelSelect from "@/components/common/LabelSelect";
import LabelTextArea from "@/components/common/LabelTextArea";
import LoadingModal from "@/components/common/LoadingModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";

interface SelectItem {
  name: string;
  value: string;
}

const mockData: SelectItem[] = [
  {
    name: "5초",
    value: "5sec",
  },
  {
    name: "10초",
    value: "10sec",
  },
  {
    name: "15초",
    value: "15sec",
  },
  {
    name: "20초",
    value: "20sec",
  },
  {
    name: "30초",
    value: "30sec",
  },
];

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onButtonClick = () => {
    console.log("클릭됐다!");
  };

  return (
    <>
      <div className="container">
        <Button
          text={"🎉참가하기"}
          type={"PARTICIPATE"}
          onButtonClick={onButtonClick}
        />
        <Button
          text={"준비하기"}
          type={"POSITIVE"}
          onButtonClick={onButtonClick}
        />
        <Button
          text={"대기 취소"}
          type={"NEGATIVE"}
          onButtonClick={onButtonClick}
        />
        <Button text={"취소"} type={"DEFAULT"} onButtonClick={onButtonClick} />
        <LoadingModal open={false} content={"문제 생성중..."} />
        <Button
          text={"오픈 팝업"}
          type={"NEGATIVE"}
          onButtonClick={() => setIsOpen(true)}
        />
        <ConfirmModal
          open={isOpen}
          onOpenChange={setIsOpen}
          title={"🚨신고"}
          content={"신고 하시겠습니까?"}
          closeButtonLabel={"취소하기"}
          activeButton={
            <Button
              text="신고하기"
              type="NEGATIVE"
              onButtonClick={() => setIsOpen(false)}
            />
          }
        />
        <br />
        <br />
        <br />
        <div className="flex gap-2">
          <LabelInput
            label={"방 제목"}
            direction="vertical"
            placeholder="방 제목을 입력하세요"
            content="123"
          />
          <LabelInput
            label={"방 제목"}
            direction="vertical"
            placeholder="방 제목을 입력하세요"
            width={300}
          />
        </div>
        <LabelInput
          label={"방 제목"}
          direction="horizontal"
          placeholder="방 제목을 입력하세요"
          width={435}
        />
        <br />
        <br />
        <div className="flex gap-2">
          <LabelSelect
            label={"제한시간(초)"}
            direction="vertical"
            placeholder="시간 선택"
            content="5sec"
            selectLabel="제한시간(초)"
            itemList={mockData}
          />
          <LabelSelect
            label={"제한시간(초)"}
            direction="vertical"
            placeholder="시간 선택"
            selectLabel="제한시간(초)"
            itemList={mockData}
          />
        </div>
        <LabelSelect
          label={"제한시간(초)"}
          direction="horizontal"
          placeholder="시간 선택"
          width={185}
          selectLabel="제한시간(초)"
          itemList={mockData}
        />
      </div>
      <br />
      <br />
      <img src="/logo.png" />
      <br />
      <br />
      <div className="flex gap-2">
        <LabelTextArea
          label={"문제"}
          direction="vertical"
          placeholder="문제를 입력하세요."
          content="지구는 태양 주의를 맴돈다."
          width={400}
          height={150}
        />
        <LabelTextArea
          label={"문제"}
          direction="vertical"
          placeholder="문제를 입력하세요."
          width={200}
        />
      </div>
      <LabelTextArea
        label={"문제"}
        direction="horizontal"
        placeholder="문제를 입력하세요."
        width={200}
      />
    </>
  );
};

export default Admin;

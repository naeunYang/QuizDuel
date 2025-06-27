import "./Home.css";
import Button from "@/components/common/Button";
import LabelInput from "@/components/common/LabelInput";
import LabelSelect from "@/components/common/LabelSelect";
import LabelTextArea from "@/components/common/LabelTextArea";
import LoadingModal from "@/components/common/LoadingModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import BaseModal from "@/components/common/BaseModal";
import { useState } from "react";
import Badge from "@/components/common/Badge";
import { Spinner } from "@/components/common/LoadingSpinner";
import { Card, CardContent } from "@/components/shadcn/card";
import { Share, Copy } from "lucide-react";

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

const badgeData: [string, string?, string?] = ["상식", "만화", "밈"];

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBaseOpen, setIsBaseOpen] = useState(false);
  const [isBase2Open, setIsBase2Open] = useState(false);
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
        <Button
          text={"새 방 만들기"}
          type={"POSITIVE"}
          onButtonClick={() => setIsBaseOpen(true)}
        />
        <BaseModal
          open={isBaseOpen}
          onOpenChange={setIsBaseOpen}
          title="🕹️ 새 방 만들기"
          content={
            <div>
              <LabelInput
                direction="vertical"
                label="방 제목"
                placeholder="방 제목을 입력하세요."
              />
              <div className="flex">
                <LabelSelect
                  label="문제 개수"
                  direction="vertical"
                  defaultValue={mockData[1]["value"]}
                  selectLabel="제한 시간(초)"
                  itemList={mockData}
                  width={135}
                />
                <LabelSelect
                  label="난이도"
                  direction="vertical"
                  defaultValue={mockData[1]["value"]}
                  selectLabel="제한 시간(초)"
                  itemList={mockData}
                  width={135}
                />
              </div>
              <div className="flex">
                <div>
                  <LabelSelect
                    label="카테고리"
                    direction="vertical"
                    defaultValue={mockData[1]["value"]}
                    selectLabel="제한 시간(초)"
                    itemList={mockData}
                    width={135}
                  />
                  <div className="ml-3 mr-3 flex gap-0 justify-between">
                    {badgeData.map((item, idx) => (
                      <Badge key={idx} content={item} />
                    ))}
                  </div>
                </div>

                <LabelSelect
                  label="제한시간(초)"
                  direction="vertical"
                  defaultValue={mockData[1]["value"]}
                  selectLabel="제한 시간(초)"
                  itemList={mockData}
                  width={135}
                />
              </div>
            </div>
          }
          closeButtonLabel={"취소"}
          activeButton={
            <Button
              text="생성"
              type="POSITIVE"
              onButtonClick={() => setIsBaseOpen(false)}
            />
          }
        />
        <Button
          text={"상대 기다리는중"}
          type={"PARTICIPATE"}
          onButtonClick={() => setIsBase2Open(true)}
        />
        <BaseModal
          open={isBase2Open}
          onOpenChange={setIsBase2Open}
          content={
            <div className="flex flex-col justify-center items-center">
              <Spinner className="text-yellow-400 w-20 h-20" />
              <span className="w-full text-center mt-5 mb-8 text-[18px]">
                🖐️ 상대를 기다리는 중...
              </span>
              <Card className="rounded-md bg-[#F5F5F5] w-70 h-25 pt-4">
                <CardContent>
                  <p className="flex flex-row justify-center items-center text-[#787878] cursor-pointer mb-3">
                    초대 링크 공유하기&nbsp;
                    <Share className="w-4 h-4" />
                  </p>
                  <p className="flex flex-row justify-center items-center text-[#1ABC9C] text-[21px] cursor-pointer">
                    ABC123&nbsp;
                    <Copy className="w-5 h-5" />
                  </p>
                </CardContent>
              </Card>
            </div>
          }
          closeButtonLabel={""}
          activeButton={
            <Button
              text="대기 취소"
              type="NEGATIVE"
              onButtonClick={() => setIsBase2Open(false)}
            />
          }
          height={390}
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

export default Home;

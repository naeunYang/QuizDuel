import "./Home.css";
import Button from "@/components/common/Button";
import LabelInput from "@/components/common/LabelInput";
import LabelSelect from "@/components/common/LabelSelect";

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

const Home = () => {
  return (
    <>
      <div className="container">
        <Button text={"🎉참가하기"} type={"PARTICIPATE"} />
        <Button text={"준비하기"} type={"POSITIVE"} />
        <Button text={"대기 취소"} type={"NEGATIVE"} />
        <Button text={"취소"} type={"DEFAULT"} />
        <br />
        <br />
        <br />
        <div className="flex gap-2">
          <LabelInput
            text={"방 제목"}
            direction="vertical"
            placeholder="방 제목을 입력하세요"
          />
          <LabelInput
            text={"방 제목"}
            direction="vertical"
            placeholder="방 제목을 입력하세요"
            width={300}
          />
        </div>
        <LabelInput
          text={"방 제목"}
          direction="horizontal"
          placeholder="방 제목을 입력하세요"
          width={435}
        />
        <br />
        <br />
        <div className="flex gap-2">
          <LabelSelect
            text={"제한시간(초)"}
            direction="vertical"
            placeholder="시간 선택"
            selectLabel="제한시간(초)"
            itemList={mockData}
          />
          <LabelSelect
            text={"제한시간(초)"}
            direction="vertical"
            placeholder="시간 선택"
            selectLabel="제한시간(초)"
            itemList={mockData}
          />
        </div>
        <LabelSelect
          text={"제한시간(초)"}
          direction="horizontal"
          placeholder="시간 선택"
          width={185}
          selectLabel="제한시간(초)"
          itemList={mockData}
        />
      </div>
    </>
  );
};

export default Home;

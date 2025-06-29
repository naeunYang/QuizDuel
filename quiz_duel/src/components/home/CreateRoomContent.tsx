import "./CreateRoomContent.css";
import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import Badge from "../common/Badge";

interface SelectItem {
  name: string;
  value: string;
}

const mockDataCount: SelectItem[] = [
  {
    name: "5개",
    value: "5",
  },
  {
    name: "10개",
    value: "10",
  },
  {
    name: "15개",
    value: "15",
  },
  {
    name: "20개",
    value: "20",
  },
  {
    name: "30개",
    value: "30",
  },
];

const mockDataLevel: SelectItem[] = [
  {
    name: "상",
    value: "high",
  },
  {
    name: "중",
    value: "medium",
  },

  {
    name: "하",
    value: "low",
  },
];

const mockDataCategory: SelectItem[] = [
  {
    name: "랜덤",
    value: "random",
  },
  {
    name: "요즘 밈",
    value: "meme",
  },
  {
    name: "드라마",
    value: "drama",
  },
  {
    name: "영화",
    value: "movie",
  },
  {
    name: "만화",
    value: "comic",
  },
  {
    name: "넌센스",
    value: "nonsense",
  },
  {
    name: "신조어",
    value: "slang",
  },
  {
    name: "이모지",
    value: "emoji",
  },
  {
    name: "추억",
    value: "memory",
  },
];

const mockDataTime: SelectItem[] = [
  {
    name: "5초",
    value: "5",
  },
  {
    name: "10초",
    value: "10",
  },
  {
    name: "15초",
    value: "15",
  },
  {
    name: "20초",
    value: "20",
  },
  {
    name: "30초",
    value: "30",
  },
];

const badgeData: [string, string?, string?] = ["상식", "만화", "밈"];

const CreateRoomContent = () => {
  return (
    <div className="CreateRoomContent">
      <LabelInput
        direction="vertical"
        label="방 제목"
        placeholder="방 제목을 입력하세요."
      />
      <div className="select_section">
        <LabelSelect
          label="문제 개수"
          direction="vertical"
          defaultValue={mockDataCount[1]["value"]}
          selectLabel="문제 개수"
          itemList={mockDataCount}
          width={135}
        />
        <LabelSelect
          label="난이도"
          direction="vertical"
          defaultValue={mockDataLevel[1]["value"]}
          selectLabel="난이도"
          itemList={mockDataLevel}
          width={135}
        />
      </div>
      <div className="select_section">
        <div>
          <LabelSelect
            label="카테고리"
            direction="vertical"
            defaultValue={mockDataCategory[1]["value"]}
            selectLabel="제한 시간(초)"
            itemList={mockDataCategory}
            width={135}
          />
          <div className="badge_section">
            {badgeData.map((item, idx) => (
              <Badge key={idx} content={item} />
            ))}
          </div>
        </div>

        <LabelSelect
          label="제한시간(초)"
          direction="vertical"
          defaultValue={mockDataTime[1]["value"]}
          selectLabel="제한 시간(초)"
          itemList={mockDataTime}
          width={135}
        />
      </div>
    </div>
  );
};

export default CreateRoomContent;

import "./CreateRoom.css";
import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import Badge from "../common/Badge";
import { useState } from "react";

interface Room {
  title: string;
  quizCount: string;
  level: string;
  category: string;
  timeLimit: string;
}

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

const CreateRoom = () => {
  const [room, setRoom] = useState<Room>({
    title: "즐겜 합시다~",
    quizCount: "5",
    level: "high",
    category: "meme",
    timeLimit: "15",
  });

  const [badgeData, setBadgeData] = useState<string[]>([]);

  const onChangeInput = (name: string, value: string) => {
    setRoom((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category") {
      setBadgeData((prev) => {
        const newArr = [...prev, value];

        if (newArr.length > 3) newArr.shift();
        return newArr;
      });
    }
  };

  return (
    <div className="CreateRoom">
      <LabelInput
        direction="vertical"
        label="방 제목"
        name="title"
        content={room.title}
        onInputValueChange={onChangeInput}
      />
      <div className="select_section">
        <LabelSelect
          label="문제 개수"
          direction="vertical"
          selectLabel="문제 개수"
          itemList={mockDataCount}
          width={135}
          name="quizCount"
          content={room.quizCount}
          onSelectValueChange={onChangeInput}
        />
        <LabelSelect
          label="난이도"
          direction="vertical"
          selectLabel="난이도"
          itemList={mockDataLevel}
          width={135}
          name="level"
          content={room.level}
          onSelectValueChange={onChangeInput}
        />
      </div>
      <div className="select_section">
        <div>
          <LabelSelect
            label="카테고리"
            direction="vertical"
            selectLabel="제한 시간(초)"
            itemList={mockDataCategory}
            width={135}
            name="category"
            content={room.category}
            onSelectValueChange={onChangeInput}
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
          selectLabel="제한 시간(초)"
          itemList={mockDataTime}
          width={135}
          name="timeLimit"
          content={room.timeLimit}
          onSelectValueChange={onChangeInput}
        />
      </div>
    </div>
  );
};

export default CreateRoom;

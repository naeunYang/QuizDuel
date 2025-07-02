import "./CreateRoom.css";
import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import Badge from "../common/Badge";

import type { RoomInfo } from "@/types/room-info";
import {
  mockDataCount,
  mockDataLevel,
  mockDataCategory,
  mockDataTime,
} from "@/data/mockData";

interface Props {
  room: RoomInfo;
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>;
}

const CreateRoom = ({ room, setRoom }: Props) => {
  const onChangeInput = (name: string, value: string) => {
    if (name === "category") {
      setRoom((prev) => {
        if (prev.category.includes(value as RoomInfo["category"][number])) {
          return prev;
        }

        const newCategory = [
          ...prev.category,
          value as RoomInfo["category"][number],
        ];

        if (newCategory.length > 3) {
          newCategory.shift();
        }

        return { ...prev, category: newCategory };
      });
    } else {
      setRoom((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="CreateRoom">
      <LabelInput
        direction="vertical"
        label="방 제목"
        name="title"
        content={room.title}
        placeholder="방 제목을 입력하세요."
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
            selectLabel="카테고리"
            itemList={mockDataCategory}
            width={135}
            name="category"
            content={room.category[2]}
            onSelectValueChange={onChangeInput}
          />
          <div className="badge_section">
            {room.category.map((item, idx) => (
              <Badge
                key={idx}
                content={
                  mockDataCategory.find((data) => data.value == item)!.name
                }
              />
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

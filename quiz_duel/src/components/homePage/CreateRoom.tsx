import "./CreateRoom.css";
import LabelInput from "../common/LabelInput";
import LabelSelect from "../common/LabelSelect";
import Badge from "../common/Badge";
import axios from "axios";
import { useEffect, useState } from "react";

import type { RoomInfo } from "@/types/roomInfo.types";
import type { RoomOption } from "@/types/room-options.types";

interface Props {
  room: RoomInfo;
  setRoom: React.Dispatch<React.SetStateAction<RoomInfo>>;
}

const CreateRoom = ({ room, setRoom }: Props) => {
  const [roomOptions, setRoomOptions] = useState<RoomOption | null>();

  useEffect(() => {
    axios
      .get("/home/room-options")
      .then((response) => {
        setRoomOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 입력값 변경
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
          itemList={roomOptions?.counts}
          getValue={(item) => item.countID}
          getName={(item) => item.countName}
          width={135}
          name="quizCount"
          content={String(room.quizCount)}
          onSelectValueChange={onChangeInput}
        />
        <LabelSelect
          label="난이도"
          direction="vertical"
          selectLabel="난이도"
          itemList={roomOptions?.levels}
          getValue={(item) => item.levelID}
          getName={(item) => item.levelName}
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
            itemList={roomOptions?.categories}
            getValue={(item) => item.categoryID}
            getName={(item) => item.categoryName}
            width={135}
            name="category"
            content={room.category[room.category.length - 1]}
            onSelectValueChange={onChangeInput}
          />
          <div className="badge_section">
            {room.category.map((item, idx) => (
              <Badge
                key={idx}
                content={
                  roomOptions?.categories.find(
                    (data) => data.categoryID == item
                  )!.categoryName
                }
              />
            ))}
          </div>
        </div>

        <LabelSelect
          label="제한시간(초)"
          direction="vertical"
          selectLabel="제한 시간(초)"
          itemList={roomOptions?.times}
          getValue={(item) => item.timeID}
          getName={(item) => item.timeName}
          width={135}
          name="timeLimit"
          content={String(room.timeLimit)}
          onSelectValueChange={onChangeInput}
        />
      </div>
    </div>
  );
};

export default CreateRoom;

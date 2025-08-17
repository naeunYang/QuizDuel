import "./CreateRoom.css";

// React Hooks, lib
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

// 컴포넌트
import LabelInput from "../../common/LabelInput";
import LabelSelect from "../../common/LabelSelect";
import Badge from "../../common/Badge";

// type
import type { RoomInfo } from "@/components/homePage/types/roomInfo.types";
import type { RoomOption } from "@/types/room-options.types";

// roomInfo 초기값
const defaultRoomData: RoomInfo = {
  code: "",
  title: "진 사람 떡볶이 쏘기😎",
  quizCount: 5,
  level: "high",
  category: [],
  timeLimit: 15,
};

interface ChildHandle {
  getValue: () => RoomInfo;
}

const CreateRoom = forwardRef<ChildHandle>((props, ref) => {
  const [roomOptions, setRoomOptions] = useState<RoomOption | null>();
  const [roomInput, setRoomInput] = useState<RoomInfo>(defaultRoomData);

  useImperativeHandle(ref, () => ({
    getValue: () => roomInput,
  }));

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
      setRoomInput((prev) => {
        // 이미 해당 카테고리 값이 설정되어 있으면 return
        if (prev.category.includes(value)) {
          return prev;
        }

        const newCategory = [...prev.category, value];

        // 3개가 넘어가면 맨 앞에 있는 요소를 제거
        if (newCategory.length > 3) {
          newCategory.shift();
        }

        return { ...prev, category: newCategory };
      });
    } else {
      setRoomInput((prev) => ({
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
        content={roomInput.title}
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
          content={String(roomInput.quizCount)}
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
          content={roomInput.level}
          onSelectValueChange={onChangeInput}
        />
      </div>
      <div className="select_section">
        <div className="category_select">
          <LabelSelect
            label="카테고리"
            direction="vertical"
            selectLabel="카테고리"
            itemList={roomOptions?.categories}
            getValue={(item) => item.categoryID}
            getName={(item) => item.categoryName}
            width={135}
            name="category"
            content={roomInput.category[roomInput.category.length - 1]}
            onSelectValueChange={onChangeInput}
          />
          <div className="badge_section">
            {roomInput.category.map((item, idx) => (
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
          content={String(roomInput.timeLimit)}
          onSelectValueChange={onChangeInput}
        />
      </div>
    </div>
  );
});

export default CreateRoom;

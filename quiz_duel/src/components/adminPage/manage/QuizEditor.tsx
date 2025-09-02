import "./QuizEditor.css";

// React Hooks
import { useNavigate } from "react-router-dom";

import { Button as ShadBtn } from "../../shadcn/button";
import Button from "../../common/Button";
import ConfirmModal from "../../common/ConfirmModal";
import SetRoomOptionModal from "./SetRoomOptionModal";

import type { TableRef } from "../types/table-ref.types";

const QuizEditor = ({
  tableRef,
}: {
  tableRef: React.RefObject<TableRef | null>;
}) => {
  const nav = useNavigate();

  // 문제 생성 버튼 클릭
  const onCreateBtnClick = () => {
    nav("/admin/createquiz");
  };

  // 문제 삭제 버튼 클릭
  const onDeleteBtnClick = () => {
    if (tableRef.current) {
      tableRef.current.onDeleteCheckedRows();
    }
  };

  return (
    <div className="QuizEditor">
      <ShadBtn className={"admin_button w-20"} onClick={onCreateBtnClick}>
        문제 생성
      </ShadBtn>
      <ConfirmModal
        title="📢 삭제"
        content="삭제하시겠습니까?"
        closeButtonLabel="아니오"
        activeButton={
          <Button text="네" type="POSITIVE" onButtonClick={onDeleteBtnClick} />
        }
        trigger={<ShadBtn className={"admin_button w-20"}>문제 삭제</ShadBtn>}
      />
      <SetRoomOptionModal />
    </div>
  );
};

export default QuizEditor;

import ConfirmModal from "@/components/common/ConfirmModal";
import "./Solution.css";
import Button from "@/components/common/Button";

export default function Solution() {
  return (
    <div className="Solution">
      <div className="content">
        드라마 '오징어 게임'은 넷플릭스에서 제작되었다.
      </div>
      <div className="footer">
        <section className="explanation">
          👤 : '오징어 게임'은 넷플릭스에서 제작 및 공개된 오리지널
          시리즈입니다.
        </section>
        <section className="declaration">
          <ConfirmModal
            title={"🚨 신고"}
            content={"이 문제를 신고할까요?"}
            closeButtonLabel={"취소하기"}
            activeButton={
              <Button
                text="신고하기"
                onButtonClick={() => {}}
                type="NEGATIVE"
              />
            }
            trigger={<p>🚨 문제가 이상해요!</p>}
          />
        </section>
      </div>
    </div>
  );
}

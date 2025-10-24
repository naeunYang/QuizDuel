import ConfirmModal from "@/components/common/ConfirmModal";
import "./Solution.css";
import Button from "@/components/common/Button";

interface Props {
  content: string;
  explanation: string | null;
}

export default function Solution({ content, explanation }: Props) {
  return (
    <div className="Solution">
      <div className="content">{content}</div>
      <div className="footer">
        {explanation && (
          <section className={"explanation"}>👤 : {explanation}</section>
        )}
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

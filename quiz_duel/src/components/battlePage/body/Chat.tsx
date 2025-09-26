import "./Chat.css";

export default function Chat() {
  return (
    <div className="Chat">
      <section className="chat_section">
        <textarea value={"😀: 오답 ㅋㅋ\n😎: 아깝다..\n"} readOnly />
      </section>
      <section className="input_section">
        <input placeholder="메세지를 입력하세요" />
        <button>전송</button>
      </section>
    </div>
  );
}

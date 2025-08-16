// React Hooks
import { useState } from "react";

// 컴포넌트
import { Input } from "../shadcn/input";

const CodeInput = ({
  ref,
  codeInputSubmit,
}: {
  ref: React.Ref<HTMLInputElement>;
  codeInputSubmit: (code: string) => void;
}) => {
  const [input, setInput] = useState("");

  const onCodeInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onCodeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    codeInputSubmit(input);
  };

  return (
    <Input
      ref={ref}
      value={input}
      onChange={onCodeInputValueChange}
      onKeyDown={onCodeInputKeyDown}
      className="!text-[1.125rem] placeholder:text-[#AAAAAA] placeholder:text-center focus:border-none p-5.5 "
      placeholder={"코드 입력 (예: ABC123)"}
    />
  );
};

export default CodeInput;

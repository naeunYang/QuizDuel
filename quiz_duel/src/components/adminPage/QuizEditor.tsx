import "./QuizEditor.css";

import { Button } from "../shadcn/button";

const QuizEditor = () => {
  return (
    <div className="QuizEditor">
      <Button className="bg-[#5a2e20] hover:bg-[#7a4531] active:bg-[#4a2316] w-20 text-white text-[1rem] font-[100] cursor-pointer">
        문제 생성
      </Button>
      <Button className="bg-[#5a2e20] hover:bg-[#7a4531] active:bg-[#4a2316] w-20 text-white text-[1rem] font-[100] cursor-pointer">
        문제 삭제
      </Button>
      <Button className="bg-[#5a2e20] hover:bg-[#7a4531] active:bg-[#4a2316] w-23 text-white text-[1rem] font-[100] cursor-pointer">
        방 옵션 관리
      </Button>
    </div>
  );
};

export default QuizEditor;

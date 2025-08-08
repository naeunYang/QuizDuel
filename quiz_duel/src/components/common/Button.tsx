import { Button as ShadcnButton } from "../shadcn/button";

interface Props {
  text: string;
  type: "CREATEROOM" | "PARTICIPATE" | "POSITIVE" | "NEGATIVE" | "DEFAULT";
  onButtonClick: () => void;
}

const Button = ({ text, type, onButtonClick }: Props) => {
  let buttonClass = "";

  switch (type) {
    case "CREATEROOM":
      buttonClass =
        "bg-[#E74C3C] hover:bg-[#C0392B] active:bg-[#A93226] w-80 p-5.5 text-[1.25rem] font-[100] cursor-pointer";
      break;
    case "PARTICIPATE":
      buttonClass =
        "bg-[#F39C12] hover:bg-[#d78b10] active:bg-[#bf7a0e] min-w-20 p-5 text-[1.05rem] font-[100] cursor-pointer";
      break;
    case "POSITIVE":
      buttonClass =
        "bg-[#1ABC9C] hover:bg-[#17a489] active:bg-[#12967b] min-w-20 p-5 text-[1.05rem] cursor-pointer";
      break;
    case "NEGATIVE":
      buttonClass =
        "bg-[#EE6A6A] hover:bg-[#d85656] active:bg-[#c24444] min-w-20 p-5 text-[1.05rem] cursor-pointer";
      break;
    case "DEFAULT":
      buttonClass =
        "bg-[#EDEDED] hover:bg-[#E6E6E6] active:bg-[#DADADA] min-w-20 p-5 text-[1.05rem] text-[#A4A4A4] cursor-pointer";
      break;
    default:
      buttonClass =
        "bg-[#F4F4F4] hover:bg-[#E6E6E6] active:bg-[#DADADA] min-w-20 p-5 text-[1.05rem] text-[#A4A4A4] cursor-pointer";
  }

  return (
    <ShadcnButton className={buttonClass} onClick={onButtonClick}>
      {text}
    </ShadcnButton>
  );
};

export default Button;

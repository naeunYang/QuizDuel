import { Badge as ShadcnBadge } from "../shadcn/badge";
import { X } from "lucide-react";

interface Props {
  content: string | undefined;
}

const Badge = (props: Props) => {
  return (
    <ShadcnBadge
      className="w-10.5 text-[13px] flex items-center gap-1"
      variant="secondary"
    >
      {props.content}
    </ShadcnBadge>
  );
};

export default Badge;

import { Badge as ShadcnBadge } from "../shadcn/badge";

interface Props {
  content: string | undefined;
}

const Badge = (props: Props) => {
  return (
    <ShadcnBadge
      className="w-10.5 text-[0.8rem] flex items-center gap-1"
      variant="secondary"
    >
      {props.content}
    </ShadcnBadge>
  );
};

export default Badge;

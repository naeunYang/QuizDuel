import { useParams } from "react-router-dom";

const Battle = () => {
  const params = useParams();

  return <div>{params.code}방 입니다~</div>;
};

export default Battle;

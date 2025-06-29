import "./Home.css";
import Title from "@/components/home/Title";
import Lobby from "@/components/home/Lobby";

const Home = () => {
  return (
    <div className="Home">
      <Title />
      <Lobby />
    </div>
  );
};

export default Home;

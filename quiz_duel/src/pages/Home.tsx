import "./Home.css";
import Title from "@/components/homePage/Title";
import Lobby from "@/components/homePage/Lobby";

const Home = () => {
  return (
    <div className="Home">
      <Title />
      <Lobby />
    </div>
  );
};

export default Home;

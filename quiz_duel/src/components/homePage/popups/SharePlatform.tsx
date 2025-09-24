import "./SharePlateform.css";

interface Props {
  fileName: string;
  platformName: string;
  onLogoClick: () => void;
}

const SharePlatform = ({ fileName, platformName, onLogoClick }: Props) => {
  return (
    <button className="SharePlatform" onClick={onLogoClick}>
      <div className="logo_section">
        <img src={`../src/assets/${fileName}`} />
      </div>
      <div className="name_section">{platformName}</div>
    </button>
  );
};

export default SharePlatform;

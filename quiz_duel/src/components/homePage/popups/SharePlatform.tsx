import "./SharePlateform.css";

interface Props {
  fileName: string;
  platformName: string;
  onLogoClick: () => void;
}

const SharePlatform = (props: Props) => {
  return (
    <button className="SharePlatform">
      <div className="logo_section" onClick={props.onLogoClick}>
        <img src={`../src/assets/${props.fileName}`} />
      </div>
      <div className="name_section">{props.platformName}</div>
    </button>
  );
};

export default SharePlatform;

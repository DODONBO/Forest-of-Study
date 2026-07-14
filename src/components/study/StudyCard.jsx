import { useNavigate } from "react-router-dom";
import tagImg from "../../assets/img/ic_point.svg";
import { addRecentStudy } from "../../utils/recentStudies";
import bgDesk from "../../assets/img/bg_create_desk.svg";
import bgWindow from "../../assets/img/bg_create_window.svg";
import bgTiles from "../../assets/img/bg_create_tiles.svg";
import bgLeaves from "../../assets/img/bg_create_leaves.svg";
import { backgroundColorEnum } from "../../utils/enum/colorEnum";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const IMAGE_BACKGROUND_MAP = {
  desk: bgDesk,
  window: bgWindow,
  tiles: bgTiles,
  leaves: bgLeaves,
};

const getStudyPoint = (study) => study.point ?? study.points ?? 0;

const getElapsedDays = (createdAt) => {
  if (!createdAt) {
    return 1;
  }

  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) {
    return 1;
  }

  return Math.max(
    1,
    Math.floor((Date.now() - createdDate.getTime()) / DAY_IN_MS) + 1,
  );
};

const getStudyEmojis = (study) => {
  const emojis = study.topEmojis ?? study.emojis ?? [];

  return Array.isArray(emojis) ? emojis.slice(0, 3) : [];
};

const getCardStyle = (study) => {
  if (study.backgroundType === "image") {
    const imageUrl = IMAGE_BACKGROUND_MAP[study.backgroundValue];

    return imageUrl
      ? {
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {};
  }
  return { backgroundColor: study.backgroundValue };
};

const getNicknameStyle = (study) => {
  const color = study.backgroundValue;

  if (color === "GREEN" || color === "#E1EDDE") {
    return { color: "#578246" };
  } else if (color === "YELLOW" || color === "#FFF1CC") {
    return { color: "#C18E1B" };
  } else if (color === "BLUE" || color === "#E0F1F5") {
    return { color: "#418099" };
  } else if (color === "PINK" || color === "#FDE0E9") {
    return { color: "#BC3C6A" };
  }
};

function StudyCard({ study }) {
  const navigate = useNavigate();
  const emojis = getStudyEmojis(study);
  const cardstyle = getCardStyle(study);
  const nicknameStyle = getNicknameStyle(study);

  const handleClick = () => {
    addRecentStudy(study);
    navigate(`/study/${study.id}`);
  };

  return (
    <div
      className={study.backgroundType + " card"}
      style={cardstyle}
      onClick={handleClick}
    >
      {study.backgroundType === "image" && (
        <div className="background_cover"></div>
      )}
      <div className="card_title_wrap">
        <span className="card_title">
          <span style={nicknameStyle}>{study.nickname} </span>의 {study.name}
        </span>
        <div className="tag point_tag">
          <img src={tagImg} alt="태그 장식" />
          {getStudyPoint(study)}
          {"\u00A0"}P
        </div>
      </div>
      <span className="card_status">
        {getElapsedDays(study.createdAt)}일째 진행중
      </span>
      <div className="card_text">{study.description}</div>
      <div className="tag_wrap">
        {emojis.length > 0 ? (
          emojis.map((emojiItem) => (
            <div className="tag" key={emojiItem.emoji}>
              {emojiItem.emoji}
              <span>{emojiItem.count}</span>
            </div>
          ))
        ) : (
          <span className="tag_empty">아직 반응이 없어요</span>
        )}
      </div>
    </div>
  );
}

export default StudyCard;

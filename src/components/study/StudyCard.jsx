import { useNavigate } from "react-router-dom";
import tagImg from "../../assets/img/ic_point.svg";
import { addRecentStudy } from "../../utils/recentStudies";

function StudyCard({ study }) {
  const navigate = useNavigate();

  const getDayCount = (createdAt) => {
    if (!createdAt) return 0;
    const diff = Math.floor(
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff + 1;
  };

  const handleClick = () => {
    addRecentStudy(study);
    navigate(`/study/${study.id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card_title_wrap">
        <span className="card_title">{study.name}</span>
        <div className="tag">
          <img src={tagImg} alt="태그 장식" />
          {study.point}P 획득
        </div>
      </div>
      <span className="card_status">
        {getDayCount(study.createdAt)}일째 진행중
      </span>
      <div className="card_text">{study.description}</div>
      <div className="tag_wrap">
        {study.topEmojis && study.topEmojis.length > 0 ? (
          study.topEmojis.map((te, idx) => (
            <div className="tag" key={idx}>
              <span>{te.emoji}</span>
              <span>{te.count}</span>
            </div>
          ))
        ) : (
          <span className="card_status" style={{ marginBottom: 0 }}>
            아직 응원이 없어요
          </span>
        )}
      </div>
    </div>
  );
}

export default StudyCard;

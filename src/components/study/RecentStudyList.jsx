import { useEffect, useState } from "react";
import tagImg from "../../assets/img/ic_point.svg";


function RecentStudyList() {
  const [recent, setRecent] = useState([]);

  const getDayCount = (createdAt) => {
    if (!createdAt) return 0;
    const diff = Math.floor(
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff + 1;
  };

  useEffect(() => {
    const saved = localStorage.getItem("recentStudies");
    if (!saved) return;

    const savedList = JSON.parse(saved);

    fetch("http://127.0.0.1:3000/study?pageSize=100")
      .then((res) => res.json())
      .then((res) => {
        const items = res.data.items;

        const filtered = savedList
          .map((saved) => items.find((item) => item.id === saved.id))
          .filter(Boolean);

        setRecent(filtered);
        localStorage.setItem("recentStudies", JSON.stringify(filtered));
      });
  }, []);

  return (
    <div className="card_container recent_scroll">
      <span className="container_title">최근 조회한 스터디</span>
      {recent.length === 0 ? (
        <p className="empty_text">아직 조회한 스터디가 없어요</p>
      ) : (
        <div className="card_wrap">
          {recent.map((study) => (
            <div className="card" key={study.id}>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentStudyList;

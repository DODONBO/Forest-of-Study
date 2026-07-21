import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";

function StudyRanking() {
  const [studyRanking, setStudyRanking] = useState([]);

  const getStudyRanking = async () => {
    try {
      const response = await axios.get("/ranking/study");
      setStudyRanking(response.data);
    } catch (error) {
      console.error(error);
    }  
  };

  const topStudyRanking = studyRanking.slice(0, 3);
  const otherStudyRanking = studyRanking.slice(3, 10);

  useEffect(() => {
    getStudyRanking();
  }, []);

  return (
    <section className="ranking-list">
      <ul className="top-ranking-list">
        {topStudyRanking.map((study) => (
          <li key={study.id} className={`top-ranking-item rank-${study.rank}`}>
            <p className="top-ranking-rank">{study.rank}위</p>
            <p className="top-ranking-name">{study.name}</p>
            <p className="top-ranking-point">{study.point}P</p>
          </li>
        ))}
      </ul>
      <ul className="other-ranking-list">
        {otherStudyRanking.map((study) => (
          <li key={study.id} className="other-ranking-item">
            <p>{study.rank}위</p>
            <p>{study.name}</p>
            <p>{study.point}P</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StudyRanking;
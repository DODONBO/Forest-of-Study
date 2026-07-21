import { useEffect, useState } from "react";
import axios from "../../utils/axios.js";

function PreviousRanking() {
  const [previousRanking, setPreviousRanking] = useState(null);

  const getPreviousRanking = async () => {
    try {
      const response = await axios.get("/ranking/previous-week");
      setPreviousRanking(response.data)
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPreviousRanking();
  },[]);

  return (
    <section className="previous-ranking">
      <div className="previous-ranking-header">
        <h2>지난주 명예의 전당</h2>
        <p>지난주 가장 높은 포인트를 기록한 주인공이에요</p>
      </div>

      <div className="previous-ranking-list">
        <div className="previous-ranking-card">
          <h3>스터디 1위</h3>
          <div className="previous-ranking-result">
            <p className="previous-ranking-name">
              {previousRanking?.study?.name}
            </p>
            <p className="previous-ranking-point">
              {previousRanking?.study?.point}P
            </p>
          </div>
        </div>
        <div className="previous-ranking-card">
          <h3>유저 1위</h3>
          <div className="previous-ranking-result">
            <p className="previous-ranking-name">
              {previousRanking?.user?.nickname}
            </p>
            <p className="previous-ranking-point">
              {previousRanking?.user?.point}P
            </p>
          </div>
          
        </div>
      </div>
      
    </section>
  )
}

export default PreviousRanking;
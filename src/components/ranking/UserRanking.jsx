import { useState, useEffect } from "react";
import axios from "../../utils/axios.js"

function UserRanking() {
  const [userRanking, setUserRanking] = useState([])

  const getUserRanking = async () => {
    try {
      const response = await axios.get("/ranking/user");
      setUserRanking(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const topUserRanking = userRanking.slice(0, 3);
  const otherUserRanking = userRanking.slice(3, 10);

  useEffect(() => {
    getUserRanking();
  }, []);

  return (
    <section className="ranking-list">
      <ul className="top-ranking-list">
        {topUserRanking.map((user) => (
          <li key={user.id} className={`top-ranking-item rank-${user.rank}`}>
            <p className="top-ranking-rank">{user.rank}위</p>
            <p className="top-ranking-name">{user.nickname}</p>
            <p className="top-ranking-point">{user.point}P</p>
          </li>
        ))}
      </ul>
      
      <ul className="other-ranking-list">
        {otherUserRanking.map((user) => (
          <li key={user.id} className="other-ranking-item">
            <p>{user.rank}위</p>
            <p>{user.nickname}</p>
            <p>{user.point}P</p>
          </li>
        ))}
      </ul>
      
    </section>
  )
}

export default UserRanking;
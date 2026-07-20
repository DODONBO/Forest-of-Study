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
    <div>
      <span>지난주 명예의 전당</span>
      <div>
        <p>스터디 1위</p>
        <p>{previousRanking?.study?.name}</p>
        <p>{previousRanking?.study?.point}P</p>
      </div>
      <div>
        <p>유저 1위</p>
        <p>{previousRanking?.user?.nickname}</p>
        <p>{previousRanking?.user?.point}P</p>
      </div>
    </div>
  )
}

export default PreviousRanking;
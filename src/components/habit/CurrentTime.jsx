import { useEffect, useState } from "react";

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let intervalTimer;

    const now = new Date();

    const timeUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    const timeOutTimer = setTimeout(() => {
      setCurrentTime(new Date());

      intervalTimer = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
    }, timeUntilNextMinute);
    

    return () => {
      clearTimeout(timeOutTimer)
      clearInterval(intervalTimer)
    }
  }, []);

  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");

  const option = { hour: "numeric", minute: "numeric" };
  const time = currentTime.toLocaleTimeString("ko-KR", option);

  return (
    <div>
      <span>현재 시간</span>
      <p>
        {`${year}-${month}-${day} ${time}`}
      </p>
    </div>
  )
}

export default CurrentTime
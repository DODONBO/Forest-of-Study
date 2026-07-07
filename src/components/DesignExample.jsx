import tagImg from '../assets/img/ic_point.svg';

function DesignExample() {
  return (
    <>
      <section>
        <div className="inner">
          <div className="card_container">
            <span className="container_title">
              컨테이너 타이틀
            </span>
            <div className="card_wrap">
              <div className="card">
                <div className="card_title_wrap">
                  <span className="card_title">카드 타이틀</span>
                  <div className="tag"><img src={tagImg} alt="태그 장식" />310P 획득</div>
                </div>
                <span className="card_status">
                  n일째 진행중
                </span>
                <div className="card_text">
                  카드 내용
                </div>
                <div className="tag_wrap">
                  <div className="tag">
                    👩🏻‍💻<span>40</span>
                  </div>
                  <div className="tag">
                    🔥<span>16</span>
                  </div>
                  <div className="tag">
                    🤍<span>8</span>
                  </div>
                </div>
              </div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </div>
          <div className="card_container">
            <span className="container_title">
              컨테이너 타이틀
            </span>
            <div className="card_wrap">
              <div className="card">
                <div className="card_title_wrap">
                  <span className="card_title">카드 타이틀</span>
                  <div className="tag"><img src={tagImg} alt="태그 장식" />310P 획득</div>
                </div>
                <span className="card_status">
                  n일째 진행중
                </span>
                <div className="card_text">
                  카드 내용
                </div>
                <div className="tag_wrap">
                  <div className="tag">
                    👩🏻‍💻<span>40</span>
                  </div>
                  <div className="tag">
                    🔥<span>16</span>
                  </div>
                  <div className="tag">
                    🤍<span>8</span>
                  </div>
                </div>
              </div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DesignExample;
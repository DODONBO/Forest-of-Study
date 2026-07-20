import { Link } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import axios from "../utils/axios";
import { useEffect } from "react";

function DashboardPage() {
  const { startLoading, endLoading } = useLoading();
  const handleLoad = async () => {
    startLoading();

    try {
      const response = await axios.get(`/api/users/dashboard`);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      endLoading();
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const todayStatus = [
    {
      id: "focus",
      label: "오늘의 집중",
      description: "오늘 기록한 집중 시간이에요",
      icon: "⏱",
      type: "time",
      hour: "03",
      minute: "20",
      footerLabel: "어제보다",
      footerValue: "+40분",
      footerClassName: "dashboard_increase",
    },
    {
      id: "habit",
      label: "완료한 습관",
      description: "오늘의 습관 달성 현황이에요",
      icon: "✓",
      type: "progress",
      current: 5,
      total: 8,
      progress: Math.round((5 / 8) * 100),
      footerLabel: "달성률",
      footerValue: "63%",
    },
    {
      id: "streak",
      label: "연속 달성",
      description: "꾸준히 공부한 날짜예요",
      icon: "🔥",
      type: "streak",
      value: 3,
      footerLabel: "최고 기록",
      footerValue: "12일",
    },
  ];

  const studies = [
    {
      id: 1,
      name: "React 프론트엔드 스터디",
      description: "컴포넌트와 상태 관리 공부하기",
      progress: 80,
      completedHabit: 4,
      totalHabit: 5,
    },
    {
      id: 2,
      name: "알고리즘 스터디",
      description: "매일 알고리즘 문제 풀이",
      progress: 45,
      completedHabit: 2,
      totalHabit: 4,
    },
    {
      id: 3,
      name: "영어 회화 스터디",
      description: "하루 30분 영어로 말하기",
      progress: 100,
      completedHabit: 3,
      totalHabit: 3,
    },
  ];

  const weeklyFocus = [
    { day: "월", minutes: 120 },
    { day: "화", minutes: 180 },
    { day: "수", minutes: 80 },
    { day: "목", minutes: 200 },
    { day: "금", minutes: 140 },
    { day: "토", minutes: 60 },
    { day: "일", minutes: 0 },
  ];

  const maxFocusMinutes = Math.max(...weeklyFocus.map((item) => item.minutes));

  const achievements = [
    {
      id: 1,
      icon: "🌱",
      name: "꾸준한 시작",
      description: "3일 연속 습관을 달성했어요",
    },
    {
      id: 2,
      icon: "⏰",
      name: "집중의 달인",
      description: "하루 집중 시간 3시간을 달성했어요",
    },
  ];

  const favoriteStudies = [
    {
      id: 1,
      name: "React 프론트엔드 스터디",
      members: 7,
      category: "개발",
    },
    {
      id: 2,
      name: "매일 알고리즘",
      members: 5,
      category: "코딩 테스트",
    },
  ];

  return (
    <section className="dashboard_page">
      <div className="inner">
        <div className="card_container">
          <div className="container_title">
            <span>
              <span className="bold green">승현지</span> 님의{" "}
              <span className="bold">대시보드</span>
            </span>
          </div>

          <div className="card_container inner_container">
            <div className="container_title dec">
              <span>오늘의 현황</span>
            </div>

            <div className="card_wrap dashboard_card_wrap">
              {todayStatus.map((status) => (
                <div className="card dashboard_card" key={status.id}>
                  <div className="dashboard_card_header">
                    <div>
                      <div className="dashboard_card_label">{status.label}</div>

                      <p className="dashboard_card_description">
                        {status.description}
                      </p>
                    </div>

                    <div className="dashboard_card_icon">{status.icon}</div>
                  </div>

                  {status.type === "time" && (
                    <div className="dashboard_card_value">
                      <strong>{status.hour}</strong>
                      <span>시간</span>
                      <strong>{status.minute}</strong>
                      <span>분</span>
                    </div>
                  )}

                  {status.type === "progress" && (
                    <>
                      <div className="dashboard_card_value">
                        <strong>{status.current}</strong>

                        <span className="dashboard_value_total">
                          / {status.total}개
                        </span>
                      </div>

                      <div className="dashboard_progress">
                        <div
                          className="dashboard_progress_bar"
                          style={{ width: `${status.progress}%` }}
                        />
                      </div>
                    </>
                  )}

                  {status.type === "streak" && (
                    <div className="dashboard_card_value">
                      <strong>{status.value}</strong>
                      <span>일째</span>
                    </div>
                  )}

                  <div className="dashboard_card_footer">
                    <span>{status.footerLabel}</span>

                    <strong className={status.footerClassName || ""}>
                      {status.footerValue}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card_container inner_container">
            <div className="container_title dec">
              <span>진행 중인 스터디</span>

              <Link to="/study" className="dashboard_more_link">
                전체 보기
              </Link>
            </div>

            <div className="dashboard_study_grid">
              {studies.map((study) => (
                <Link
                  to={`/study/${study.id}`}
                  className="card dashboard_card dashboard_study_card"
                  key={study.id}
                >
                  <div className="dashboard_card_header">
                    <div>
                      <div className="dashboard_card_label">{study.name}</div>

                      <p className="dashboard_card_description">
                        {study.description}
                      </p>
                    </div>

                    <div className="dashboard_card_icon">📚</div>
                  </div>

                  <div className="dashboard_study_summary">
                    <span>오늘의 습관</span>

                    <strong>
                      {study.completedHabit} / {study.totalHabit}
                    </strong>
                  </div>

                  <div className="dashboard_progress">
                    <div
                      className="dashboard_progress_bar"
                      style={{ width: `${study.progress}%` }}
                    />
                  </div>

                  <div className="dashboard_card_footer">
                    <span>오늘의 달성률</span>
                    <strong>{study.progress}%</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="card_container dashboard_activity_container inner_container">
            <div className="container_title">
              <span className="bold">활동 요약</span>
            </div>

            <div className="dashboard_activity_grid">
              <div className="card dashboard_card dashboard_activity_card dashboard_weekly_card">
                <div className="dashboard_card_header">
                  <div>
                    <div className="dashboard_card_label">이번 주 집중</div>

                    <p className="dashboard_card_description">
                      요일별 집중 시간을 확인해 보세요
                    </p>
                  </div>

                  <div className="dashboard_card_icon">📊</div>
                </div>

                <div className="dashboard_weekly_total">
                  <strong>13</strong>
                  <span>시간 00분</span>
                </div>

                <div className="dashboard_weekly_chart">
                  {weeklyFocus.map((item) => {
                    const barHeight =
                      maxFocusMinutes === 0
                        ? 0
                        : (item.minutes / maxFocusMinutes) * 100;

                    return (
                      <div className="dashboard_chart_item" key={item.day}>
                        <div className="dashboard_chart_bar_wrap">
                          <div
                            className="dashboard_chart_bar"
                            style={{ height: `${barHeight}%` }}
                          />
                        </div>

                        <span>{item.day}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="dashboard_card_footer">
                  <span>지난주보다</span>
                  <strong className="dashboard_increase">+2시간 30분</strong>
                </div>
              </div>

              <div className="card dashboard_card dashboard_activity_card">
                <div className="dashboard_card_header">
                  <div>
                    <div className="dashboard_card_label">최근 획득한 업적</div>

                    <p className="dashboard_card_description">
                      새롭게 달성한 기록이에요
                    </p>
                  </div>

                  <div className="dashboard_card_icon">🏆</div>
                </div>

                <div className="dashboard_achievement_list">
                  {achievements.map((achievement) => (
                    <div
                      className="dashboard_achievement_item"
                      key={achievement.id}
                    >
                      <div className="dashboard_achievement_icon">
                        {achievement.icon}
                      </div>

                      <div>
                        <strong>{achievement.name}</strong>
                        <p>{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="dashboard_card_footer">
                  <span>전체 업적</span>
                  <strong>5개</strong>
                </div>
              </div>

              <div className="card dashboard_card dashboard_activity_card">
                <div className="dashboard_card_header">
                  <div>
                    <div className="dashboard_card_label">즐겨찾는 스터디</div>

                    <p className="dashboard_card_description">
                      자주 방문하는 스터디예요
                    </p>
                  </div>

                  <div className="dashboard_card_icon">⭐</div>
                </div>

                <div className="dashboard_favorite_list">
                  {favoriteStudies.map((study) => (
                    <Link
                      to={`/study/${study.id}`}
                      className="dashboard_favorite_item"
                      key={study.id}
                    >
                      <div>
                        <strong>{study.name}</strong>

                        <p>
                          {study.category} · 참여자 {study.members}명
                        </p>
                      </div>

                      <span>›</span>
                    </Link>
                  ))}
                </div>

                <div className="dashboard_card_footer">
                  <span>즐겨찾기</span>
                  <strong>{favoriteStudies.length}개</strong>
                </div>
              </div>

              <div className="card dashboard_card dashboard_activity_card">
                <div className="dashboard_card_header">
                  <div>
                    <div className="dashboard_card_label">이번 주 목표</div>

                    <p className="dashboard_card_description">
                      목표까지 조금만 더 힘내세요
                    </p>
                  </div>

                  <div className="dashboard_card_icon">🎯</div>
                </div>

                <div className="dashboard_goal_value">
                  <strong>72</strong>
                  <span>%</span>
                </div>

                <div className="dashboard_progress dashboard_goal_progress">
                  <div
                    className="dashboard_progress_bar"
                    style={{ width: "72%" }}
                  />
                </div>

                <p className="dashboard_goal_description">
                  이번 주 목표 18시간 중 13시간을 달성했어요.
                </p>

                <div className="dashboard_card_footer">
                  <span>남은 목표</span>
                  <strong>5시간</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;

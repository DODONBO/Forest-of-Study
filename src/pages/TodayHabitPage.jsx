import { useState } from "react";

import HabitList from "../components/habit/HabitList.jsx";
import HabitEditModal from "../components/habit/HabitEditModal.jsx";

function TodayHabitPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [study, setStudy] = useState([]);
  const [habits, setHabits] = useState([
    { id: 1, name: "매일매일 6시 기상", isChecked: true },
    { id: 2, name: "아침 챙겨 먹기", isChecked: false },
    { id: 3, name: "물 2L 마시기", isChecked: false },
  ]);

  const handleSaveHabits = (newHabits) => {
    setHabits(newHabits);
    setIsEditModalOpen(false);
  };

  return (
    <section>
      <div className="inner">
        <div className="card_container">
          <span className="container_title">스터디 이름</span>
          <div className="card_container inner_container">
            <div className="inner">
              <span className="container_title">오늘의 습관</span>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="edit_habit_btn"
              >
                목록 수정
              </button>
              <HabitList habits={habits} />
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
                <HabitEditModal
                  habits={habits}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={handleSaveHabits}
                />
      )}
    </section>
  );
}

export default TodayHabitPage;

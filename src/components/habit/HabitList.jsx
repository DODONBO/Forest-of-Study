import HabitItem from "./HabitItem.jsx"

function HabitList({ habits, handleLoad, isLoading }) {
  if (isLoading) {
    return (
      <p>
        습관 목록을 불러오는 중입니다.
      </p>
    );
  }

  if (habits.length === 0) {
    return (
      <p>
        아직 습관이 없어요<br />
        목록 수정을 눌러 습관을 생성해보세요
      </p>
    ) 
  }
  
  return (
    <div className="habit_wrap">
      {habits.map((habit) => (
        <HabitItem 
          key={habit.id}
          habit={habit}
          habits={habits}
          handleLoad={handleLoad}
        />
      ))}
    </div>
  )
}

export default HabitList
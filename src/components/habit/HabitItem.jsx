function HabitItem({ habit }) {
  return (
    <button
      type='button'
      className="habit_btn"
    >
      <p>{habit.name}</p>
    </button>
  )
}

export default HabitItem
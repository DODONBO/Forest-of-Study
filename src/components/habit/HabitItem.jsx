import axios from "../../utils/axios";

function HabitItem({ habit, habits, studyId, handleLoad }) {
  const toggleCheck = async (habitId, data) => {
    const response = await axios.patch(`/study/${studyId}/habit/${habitId}/record`);
   
    return response.data;
  };

  const toggleHabit = async (habitId) => {
    try {
      const targetHabit = habits.find((habit) => habit.id === habitId);

      const response = await toggleCheck(habitId, {
        isChecked: !targetHabit.isChecked,
      });

      handleLoad();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type='button'
      className={`habit_btn ${habit.habitRecords[0] && habit.habitRecords[0].isChecked ? "checked" : ""}`}
      onClick={() => toggleHabit(habit.id)}>
      <p>{habit.name}</p>
    </button>
  )
}

export default HabitItem
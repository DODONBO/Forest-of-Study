import axios from "../../utils/axios";

function HabitItem({ habit, habits, studyId, handleLoad }) {

  const toggleCheck = async (habitId, data) => {
    try {
      const response = await axios.patch(`/study/${studyId}/habit/${habitId}/record`);

    } catch (error) {
      console.log(error);
      
    } finally {
      handleLoad();
    }
  };

  const toggleHabit = async (habitId) => {
    const targetHabit = habits.find((habit) => habit.id === habitId);

    await toggleCheck(habitId, {
      isChecked: !targetHabit.isChecked,
    });
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
import axios from "../../utils/axios";

function HabitItem({ habit, habits, studyId }) {
  const patchHabit = async (habitId, data) => {
    const response = await axios.patch(`/study/${studyId}/habit/${habitId}`, data);
   
    return response.data;
  };

  const toggleHabit = async (habitId) => {
    try {
      const targetHabit = habits.find((habit) => habit.id === habitId);

      const response = await patchHabit(habitId, {
        isChecked: !targetHabit.isChecked,
      });

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === habitId ? response : habit
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type='button'
      className={`habit_btn ${habit.isChecked ? "checked" : ""}`}
      onClick={() => toggleHabit(habit.id)}>
      <p>{habit.name}</p>
    </button>
  )
}

export default HabitItem
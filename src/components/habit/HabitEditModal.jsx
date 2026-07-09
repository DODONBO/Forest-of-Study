import { useState } from 'react'
import trashIcon from '../../assets/img/ic_trash.svg'

function HabitEditModal({ habits, onClose, onSave }) {
  const [editHabits, setEditHabits] = useState(habits)
  const [newHabitName, setNewHabitName] = useState('')

  const handleAddHabit = (e) => {
    e.preventDefault()

    if (newHabitName.trim() === '') return

    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      isChecked: false,
    }

    setEditHabits((prevHabits) => [...prevHabits, newHabit])
    setNewHabitName('')
  }

  const handleSubmit = () => {
    onSave(editHabits)
  }

  return (
    <div className="modal_wrap">
      <div className='modal edit_habit_modal'>
        <div className="inner">
        <div className="modal_title">습관 목록</div>
          <div className='habit_wrap'>
            {editHabits.length === 0 ? (
              <p>아직 습관이 없어요</p>
            ) : (
              editHabits.map((habit) => (
                <div key={habit.id} className='habit_line'>
                  <span className='habit_btn'>{habit.name}</span>
                  <button type="button" className='delete_habit_btn'>
                    <img src={trashIcon} alt="삭제 아이콘" />
                  </button>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddHabit}>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
            />

            <button type="submit">
              +
            </button>
          </form>
        </div>
        <div className='modal_btn_wrap'>
            <button type="button" onClick={onClose}>
              취소
            </button>

            <button type="button" onClick={handleSubmit} className='green'>
              수정 완료
            </button>
          </div>
      </div>
    </div>
  )
}

export default HabitEditModal
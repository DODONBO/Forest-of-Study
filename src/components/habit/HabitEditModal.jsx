import trachIcon from '../../assets/img/ic_trash.svg'

function HabitEditModal({ habits, onClose }) {
  return (
    <div>
      <h2>습관 목록</h2>
      <div>
        {habits.map((habit) => (
          <div key={habit.id}>
            <span>{habit.name}</span>
            <button type="button">
              <img src={trachIcon} alt="삭제 아이콘" />
            </button>
          </div>
        ))}
      </div>
      <div>
        <button>+</button>
      </div>
      <div>
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="button">
          수정 완료
        </button>
      </div>
    </div>
  )
}

export default HabitEditModal
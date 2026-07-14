import { useEffect, useState } from "react";
import trashIcon from "../../assets/img/ic_trash.svg";
import addBtnIcon from "../../assets/img/ic_plus.svg";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import Popup from "../Popup";
import { modalType } from "../../utils/enum/modalTypeEnum";
import { useLoading } from "../../contexts/LoadingContext";

function HabitEditModal({ habits, onClose, onSave }) {
  const { startLoading, endLoading } = useLoading();
  const { id } = useParams();
  const [editHabits, setEditHabits] = useState(() =>
    habits.map((habit) => ({
      ...habit,
      localId: habit.id,
    })),
  );
  const [newHabitName, setNewHabitName] = useState("");
  const [popup, setPopup] = useState({
    isOpen: false,
    type: modalType.CONFIRM,
    message: "",
    onConfirm: null,
  });

  const closePopup = () => {
    setPopup({
      isOpen: false,
      type: modalType.ALERT,
      message: "",
      onConfirm: null,
    });
  };

  const openConfirm = (message, onConfirm) => {
    setPopup({
      isOpen: true,
      type: modalType.CONFIRM,
      message,
      onConfirm,
    });
  };

  // 새 습관 입력, 습관 추가, 기존 습관 이름 수정 여부 확인
  const hasUnsavedChanges = 
    newHabitName.trim() !== "" ||
    editHabits.some((habit) => {
      if (!habit.id) {
        return true;
      }

      const originalHabit = habits.find(
        (originalHabit) => originalHabit.id === habit.id,
      );

      return originalHabit?.name !== habit.name;
    });
  
  // 수정 사항 있으면 확인 팝업 표시, 없으면 바로 모달 닫기
  const handleCloseRequest = () => {
    if (!hasUnsavedChanges) {
      onClose();
      return;
    }

    openConfirm("수정 중인 내용이 저장되지 않습니다. 나가시겠습니까?", () => {
      closePopup();
      onClose();
    });
  };

  // esc 입력시 팝업이 열려 있으면 팝업부터 닫고,
  // 팝업이 없으면 습관 수정 모달 닫기 요청
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key !== "Escape") return;

      if (popup.isOpen) {
        closePopup();
        return;
      }

      handleCloseRequest();
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [popup.isOpen, hasUnsavedChanges, onClose]);

  // 모달 내부가 아닌 바깥 배경을 클릭했을 때만 닫기 요청
  const handleBackdropClick = (e) => {
    if (popup.isOpen) return;

    if (e.target === e.currentTarget) {
      handleCloseRequest();
    }
  };

  const openAlert = (message, callback) => {
    setPopup({
      isOpen: true,
      type: "alert",
      message,
      onConfirm: () => {
        closePopup();
        callback?.();
      },
    });
  };

  const openDeletePopup = (e, habit) => {
    e.stopPropagation();

    openConfirm("삭제하시겠습니까?", () => {
      deleteHabit(habit);
    });
  };

  const deleteHabit = async (habit) => {
    if (!habit.id) {
      setEditHabits((prev) =>
        prev.filter((item) => item.localId !== habit.localId),
      );

      openAlert("삭제되었습니다.");
      return;
    }

    startLoading();
    try {
      await axios.delete(`/study/${id}/habit/${habit.id}/`);
      setEditHabits((prev) =>
        prev.filter((item) => item.localId !== habit.localId),
      );
      openAlert("삭제되었습니다.");
    } catch (error) {
      console.error(error);
      endLoading();
      openAlert("삭제에 실패했습니다.");

    } finally {
      endLoading();
    }
  };

  const handleAddHabit = (e) => {
    e.preventDefault();

    if (newHabitName.trim() === "") return;

    const newHabit = {
      id: null,
      localId: crypto.randomUUID(),
      name: newHabitName,
      isChecked: false,
    };
    setEditHabits([...editHabits, newHabit]);
    setNewHabitName("");
  };

  const saveUpdatedHabits = async (e) => {
    e.preventDefault();

    startLoading();
    try {
      const response = await axios.patch(`/study/${id}/habit`, editHabits);
      openAlert("추가되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      onSave();
      endLoading();
    }
  };

  const handleHabitNameChange = (localId, value) => {
    setEditHabits((prev) =>
      prev.map((habit) =>
        habit.localId === localId ? { ...habit, name: value } : habit,
      ),
    );
  };

  return (
    <div className="modal_wrap" onClick={handleBackdropClick}>
      <div className="modal edit_habit_modal">
        <div className="inner">
          <div className="modal_title">습관 목록</div>
          <div className="habit_wrap">
            {editHabits.length === 0 ? (
              <p>아직 습관이 없어요</p>
            ) : (
              editHabits.map((habit) => (
                <div key={habit.localId} className="habit_line">
                  <input
                    className="habit_btn"
                    value={habit.name}
                    onChange={(e) =>
                      handleHabitNameChange(habit.localId, e.target.value)
                    }
                  />
                  <div
                    className="delete_habit_btn"
                    onClick={(e) => openDeletePopup(e, habit)}
                  >
                    <img src={trashIcon} alt="삭제 아이콘" />
                  </div>
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
              <img src={addBtnIcon} alt="추가 아이콘" />
            </button>
          </form>
        </div>
        <div className="modal_btn_wrap">
          <button type="button" onClick={onClose}>
            취소
          </button>

          <button
            type="button"
            className="green"
            onClick={(e) => saveUpdatedHabits(e)}
          >
            수정 완료
          </button>
        </div>
      </div>
      {popup.isOpen && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={closePopup}
          onConfirm={popup.onConfirm}
        />
      )}
    </div>
  );
}

export default HabitEditModal;

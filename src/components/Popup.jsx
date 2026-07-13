import { modalType } from "../utils/enum/modalTypeEnum";

function Popup({ type = "alert", message, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <div className="modal_wrap">
      <div className="modal small">
        <div className="modal_sub_text">{message}</div>

        <div className="modal_btn_wrap">
          {type === modalType.CONFIRM && (
          <button type="button" onClick={onClose}>
            취소
          </button>
          )}
          <button
            type="button"
            className="green"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;

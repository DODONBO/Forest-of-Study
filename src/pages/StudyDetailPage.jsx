import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { mockStudies } from "../mocks/studyMock.js";
import "../style.css";

const StudyDetailPage = () => {
  const { id } = useParams();

  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isEmojiMoreOpen, setIsEmojiMoreOpen] = useState(false);
  const emojiRef = useRef(null);
  const [emoji, setEmoji] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setIsEmojiOpen(false);
        setIsEmojiMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const study = mockStudies.find((item) => item.id === id);
  if (!study) {
    return <div>스터디를 찾을 수 없습니다.</div>;
  }
  // 이모지 선택시 출력 확인
  const handleEmojiClick = (selectedEmoji) => {
    setEmoji((prevEmoji) => {
      const alreadyExists = prevEmoji.some(
        (item) => item.emoji === selectedEmoji,
      );

      if (alreadyExists) {
        return prevEmoji.map((item) =>
          item.emoji === selectedEmoji
            ? { ...item, count: item.count + 1 }
            : item,
        );
      }

      return [
        ...prevEmoji,
        {
          emoji: selectedEmoji,
          count: 1,
        },
      ];
    });
    setIsEmojiOpen(false);
    setIsEmojiMoreOpen(false);
  };

  // 이모지 3개까지만 보여주고 나머지는 +N으로 표시
  const visibleEmoji = emoji.slice(0, 3);
  const hiddenEmoji = emoji.slice(3);
  return (
    <main>
      <header>
        <div className="emoji-container" ref={emojiRef}>
          {/* 화면에 기본으로 보여줄 이모지 3개 */}
          {visibleEmoji.map((item) => (
            <button
              type="button"
              key={item.emoji}
              className="emoji-item"
              onClick={() => handleEmojiClick(item.emoji)}
            >
              <span>{item.emoji}</span>
              <span>{item.count}</span>
            </button>
          ))}

          {/* 숨겨진 이모지 목록 */}
          {hiddenEmoji.length > 0 && (
            <div className="emoji-more-wrapper">
              <button
                type="button"
                className="emoji-more-button"
                onClick={() => {
                  setIsEmojiMoreOpen((prev) => !prev);
                  setIsEmojiOpen(false);
                }}
              >
                +{hiddenEmoji.length}...
              </button>

              {isEmojiMoreOpen && (
                <div className="more-emoji-list">
                  {hiddenEmoji.map((item) => (
                    <button
                      type="button"
                      key={item.emoji}
                      className="emoji-item"
                      onClick={() => {
                        handleEmojiClick(item.emoji);
                        setIsEmojiOpen(false);
                        setIsEmojiMoreOpen(false);
                      }}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 이모지 추가 */}
          <div className="emoji-add-wrapper">
            <button
              type="button"
              className="emoji-add-button"
              onClick={() => {
                setIsEmojiOpen((prev) => !prev);
                setIsEmojiMoreOpen(true);
              }}
            >
              <span></span>
              <span>추가</span>
            </button>

            {isEmojiOpen && (
              <div className="emoji-picker">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    handleEmojiClick(emojiData.emoji);
                    // setIsEmojiOpen(false);
                    // setIsEmojiMoreOpen(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <section>스터디 상세페이지 {id}</section>
      <section>습관 영역</section>
    </main>
  );
};

export default StudyDetailPage;

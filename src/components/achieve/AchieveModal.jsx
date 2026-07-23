import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { ACHIEVEMENTS } from "./achievements.js";
import "./achievements.css";

export default function AchieveModal({ onClose }) {

    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const handleLoad = async () => {
            setIsLoading(true);
            setErrorMessage("");

            try {
                const response = await axios.get("/achievements");
                const data = response.data?.data ?? response.data ?? [];

                setRows(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("업적 조회 실패:", error.response?.data ?? error);

                setRows([]);
                setErrorMessage(
                    error.response?.data?.message ?? "업적을 불러오지 못했습니다.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        handleLoad();
    }, []);

    const merged = ACHIEVEMENTS.map((item) => {
        const found = rows.find((row) => row.achievementType === item.type);

        return {
            ...item,
            isAchieved: Boolean(found),
            achievedAt: found?.achievedAt ?? null,
        };
    });

    const achievedCount = merged.filter((item) => item.isAchieved).length;

    return (
        <div className="modal_wrap">
            <div className="modal achieve_modal">
                <div className="modal_title">
                    <span>전체 업적</span>
                    <button type="button" className="modal_close_btn" onClick={onClose}>닫기</button>
                </div>

                <p className="achieve_summary">
                    전체 {merged.length}개 중 <strong>{achievedCount}개</strong>를 달성했어요
                </p>

                {isLoading && <p className="list_state_message">업적을 불러오는 중입니다.</p>}

                {!isLoading && errorMessage && (
                    <p className="list_state_message error">{errorMessage}</p>
                )}

                {!isLoading && !errorMessage && (
                    <ul className="achieve_list">
                        {merged.map((item) => (
                            <li
                                className={`achieve_item ${item.isAchieved ? "" : "is_locked"}`}
                                key={item.type}
                            >
                                <div className="achieve_icon">
                                    {item.isAchieved ? item.icon : "🔒"}
                                </div>

                                <div className="achieve_text">
                                    <strong>{item.name}</strong>
                                    <p>{item.description}</p>
                                </div>

                                <span className="achieve_state">
                                    {item.isAchieved ? "달성" : "미달성"}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
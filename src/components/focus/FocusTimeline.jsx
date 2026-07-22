import { useState, useEffect } from 'react';
import axios from '../../utils/axios.js';

export default function FocusTimeline({ studyId, password, loginId }) {
    const [sessions, setSessions] = useState([]);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);
    const [scope, setScope] = useState('me');   // 토글용
    const [stats, setStats] = useState({ totalSeconds: 0, totalPoint: 0, sessions: [] });

    useEffect(() => {
        if (!password) return;

        async function fetchSessionData() {
            setIsFocusLoading(true);
            setFocusLoadError('');

            try {
                const response = await axios.post(`/study/${studyId}/focus/sessions`, {
                    loginId, password, scope
                });

                const nextSessionData = response.data.data;
                setStats(nextSessionData);

            } catch (error) {
                console.error('오늘의 집중 조회 오류:', error);

                setFocusLoadError(
                    error?.response?.data?.message ??
                    '오늘의 집중 정보를 불러오지 못했습니다.',
                );
            } finally {
                setIsFocusLoading(false);
            }
        }

        fetchSessionData();
    }, [studyId, password, loginId, scope]);



};
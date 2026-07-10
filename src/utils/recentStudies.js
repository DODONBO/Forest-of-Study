const STORAGE_KEY = 'recentStudies';
const MAX_COUNT = 3;

export const getRecentStudies = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const addRecentStudy = (study) => {
    const current = getRecentStudies().filter((s) => s.id !== study.id);
    const updated = [study, ...current].slice(0, MAX_COUNT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};
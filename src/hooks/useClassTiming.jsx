import { useEffect, useState } from "react";

function getTodayClasses(classes) {
    const now = new Date();
    const todayIndex = now.getDay(); // 0 (Domingo) - 6 (Sábado)
    return classes
        .filter((cls) => cls.day === todayIndex)
        .sort((a, b) => a.start.localeCompare(b.start));
}

function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

export default function useClassTiming() {
    const [currentClass, setCurrentClass] = useState(null);
    const [previousClass, setPreviousClass] = useState(null);
    const [nextClass, setNextClass] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("classes");
        const classes = stored ? JSON.parse(stored) : [];

        const todayClasses = getTodayClasses(classes);
        const nowMinutes = getCurrentTimeInMinutes();

        let current = null;
        let previous = null;
        let next = null;

        for (let i = 0; i < todayClasses.length; i++) {
            const cls = todayClasses[i];
            const start = parseTime(cls.start);
            const end = parseTime(cls.end);

            if (nowMinutes >= start && nowMinutes < end) {
                current = cls;
                previous = todayClasses[i - 1] || null;
                next = todayClasses[i + 1] || null;
                break;
            } else if (nowMinutes < start) {
                current = null;
                previous = todayClasses[i - 1] || null;
                next = cls;
                break;
            }
        }

        if (
            !current &&
            todayClasses.length > 0 &&
            nowMinutes >= parseTime(todayClasses[todayClasses.length - 1].end)
        ) {
            previous = todayClasses[todayClasses.length - 1];
        }

        setCurrentClass(current);
        setPreviousClass(previous);
        setNextClass(next);
    }, []);

    return { currentClass, previousClass, nextClass };
}

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("es-MX", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            });
            setTime(formatted);
        };

        updateTime(); // inicial
        const interval = setInterval(updateTime, 1000); // cada segundo

        return () => clearInterval(interval); // limpiar al desmontar
    }, []);

    return <p className="text-sm font-poppins text-gray-600">{time}</p>;
}

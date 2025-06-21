import ClassBlock from "./ClassBlock";
import ClassModal from "../pages/modals/ClassModal";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];
const hours = Array.from({ length: 24 }, (_, i) => i); // 0 a 23

export default function WeeklySchedule({ classes, setClasses }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="sm:p-4">
                <div className="grid grid-cols-[50px_repeat(7,1fr)] sm:rounded-2xl overflow-hidden sm:bg-white font-poppins shadow-md">
                    {/* Encabezado de días */}
                    <div className="sticky top-0" />
                    {days.map((day) => (
                        <div
                            key={day}
                            className="text-center py-2 font-semibold font-poppis sticky top-0"
                        >
                            {day === "Miércoles" || day === "Martes"
                                ? day.slice(0, 2)
                                : day[0]}
                        </div>
                    ))}

                    {/* Filas de horario */}
                    {hours.map((hour) => (
                        <div key={hour} className="contents">
                            <div className="border-t border-gray-300 text-sm text-right pr-2 py-1">
                                {hour}:00
                            </div>
                            {days.map((day) => (
                                <div
                                    key={day + hour}
                                    className="relative border-t border-gray-300 border-l h-20"
                                >
                                    {classes
                                        .filter(
                                            (cls) =>
                                                cls.day === day &&
                                                parseInt(
                                                    cls.start.split(":")[0]
                                                ) === hour
                                        )
                                        .map((cls, i) => (
                                            <ClassBlock
                                                key={i}
                                                classData={cls}
                                                onClick={() => {
                                                    setSelectedClass(cls);
                                                    setIsModalOpen(true);
                                                }}
                                            />
                                        ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <ClassModal
                selectedClass={selectedClass}
                isModalOpen={isModalOpen}
                toggleModalOpen={closeModal}
                setClasses={setClasses}
            />

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
                        onClick={closeModal}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

import AddBtn from "../AddBtn";
import ClassFormModal from "./modals/ClassFormModal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeeklySchedule from "../WeeklySchedule/WeeklySchedule";

export default function Schedule() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Estado para las clases, cargando de localStorage o array vacío
    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem("classes");
        return saved ? JSON.parse(saved) : [];
    });

    return (
        <>
            <AddBtn toggleFormOpen={() => setIsFormOpen(!isFormOpen)} />
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
                        onClick={() => setIsFormOpen(false)}
                    />
                )}
            </AnimatePresence>
            <ClassFormModal
                isFormOpen={isFormOpen}
                toggleFormOpen={() => setIsFormOpen(!isFormOpen)}
                classes={classes}
                setClasses={setClasses}
            />

            <WeeklySchedule classes={classes} />
        </>
    );
}

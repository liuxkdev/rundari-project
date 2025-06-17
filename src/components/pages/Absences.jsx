import AddBtn from "../AddBtn";
import AbsenceFormModal from "./modals/AbsencesFormModal";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AbsenceCard from "../Cards/AbsenceCard";

export default function Absences() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [absences, setAbsences] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("absences")) || [];
        setAbsences(stored);
    }, []);

    const refreshAbsences = () => {
        const updated = JSON.parse(localStorage.getItem("absences")) || [];
        setAbsences(updated);
    };

    return (
        <>
            <AddBtn toggleFormOpen={() => setIsFormOpen(true)} />

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

            <AbsenceFormModal
                isFormOpen={isFormOpen}
                toggleFormOpen={() => {
                    setIsFormOpen(false);
                    refreshAbsences();
                }}
            />

            <section className="p-4 mt-4 grid gap-4">
                {absences.length === 0 ? (
                    <p className="text-gray-600 font-poppins">
                        No hay faltas registradas.
                    </p>
                ) : (
                    absences.map((absence) => <AbsenceCard absence={absence} />)
                )}
            </section>
        </>
    );
}

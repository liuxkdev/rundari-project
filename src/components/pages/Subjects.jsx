import AddBtn from "../AddBtn";
import SubjectFormModal from "./modals/SubjectFormModal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectCard from "../Cards/SubjectCard";
import PageNull from "../PageNull";
import { sub } from "framer-motion/m";

export default function Subjects() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const savedSubjects =
            JSON.parse(localStorage.getItem("subjects")) || [];
        setSubjects(savedSubjects);
    }, []);

    const handleCloseForm = () => {
        setIsFormOpen(false);
        const updatedSubjects =
            JSON.parse(localStorage.getItem("subjects")) || [];
        setSubjects(updatedSubjects);
    };

    const handleDeleteSubject = (idToDelete) => {
        // Actualizar materias
        const updatedSubjects = subjects.filter(
            (subject) => subject.id !== idToDelete
        );
        setSubjects(updatedSubjects);
        localStorage.setItem("subjects", JSON.stringify(updatedSubjects));

        // Actualizar faltas (absences)
        const storedAbsences =
            JSON.parse(localStorage.getItem("absences")) || [];
        const updatedAbsences = storedAbsences.filter(
            (absence) => absence.subjectId !== idToDelete
        );
        localStorage.setItem("absences", JSON.stringify(updatedAbsences));
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
                        onClick={handleCloseForm}
                    />
                )}
            </AnimatePresence>

            <SubjectFormModal
                isFormOpen={isFormOpen}
                toggleFormOpen={handleCloseForm}
            />

            <section
                className={`grid gap-4  ${
                    subjects.length > 0
                        ? "grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] p-6"
                        : "grid-cols-1 h-full"
                }`}
            >
                {subjects.length === 0 ? (
                    <PageNull
                        title={"Sin asignaturas"}
                        text={"Aquí aparecerán las asignaturas que añadas"}
                    />
                ) : (
                    subjects.map((subject) => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            onDelete={handleDeleteSubject}
                        />
                    ))
                )}
            </section>
        </>
    );
}

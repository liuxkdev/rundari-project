import AddBtn from "../AddBtn";
import SubjectFormModal from "./modals/SubjectFormModal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectCard from "../Cards/SubjectCard";

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
        const updatedSubjects = subjects.filter(
            (subject) => subject.id !== idToDelete
        );
        setSubjects(updatedSubjects);
        localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
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

            <section className="p-4 mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subjects.length === 0 ? (
                    <p className="text-gray-600 font-poppins">
                        No hay asignaturas guardadas.
                    </p>
                ) : (
                    subjects.map((subject) => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            onDelete={handleDeleteSubject} // ← PASAMOS LA FUNCIÓN AQUÍ
                        />
                    ))
                )}
            </section>
        </>
    );
}

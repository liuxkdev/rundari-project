import { useEffect, useState } from "react";
import AddBtn from "../AddBtn";
import AbsenceFormModal from "./modals/AbsencesFormModal";
import AbsenceCard from "../Cards/AbsenceCard";
import AbsencesPerSubjectCard from "../Cards/AbsencesPerSubjectCard";
import DelaysPerSubjectCard from "../Cards/DelaysPerSubjectCard";
import AbsencesLimitSelector from "../Selectors/AbsencesLimitSelector";
import DelaysLimitSelector from "../Selectors/DelaysLimitSelector";
import { motion, AnimatePresence } from "framer-motion";

export default function Absences() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAbsencesLimitSelectorOpen, setIsAbsencesLimitSelectorOpen] =
        useState(false);
    const [isDelaysLimitSelectorOpen, setIsDelaysLimitSelectorOpen] =
        useState(false);
    const [absences, setAbsences] = useState([]);
    const [absencesBySubject, setAbsencesBySubject] = useState({});
    const [delaysBySubject, setDelaysBySubject] = useState({});

    const loadAbsences = () => {
        const stored = JSON.parse(localStorage.getItem("absences")) || [];
        setAbsences(stored);

        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

        const faltas = stored.filter((a) => a.type?.toLowerCase() === "falta");
        const retardos = stored.filter(
            (a) => a.type?.toLowerCase() === "retardo"
        );

        const countGrouped = (array) =>
            array.reduce((acc, item) => {
                acc[item.subjectId] = (acc[item.subjectId] || 0) + 1;
                return acc;
            }, {});

        const faltasCount = countGrouped(faltas);
        const retardosCount = countGrouped(retardos);

        const faltasPorAsignatura = {};
        const retardosPorAsignatura = {};

        subjects.forEach((s) => {
            const {
                id,
                name,
                color = "gray",
                limitOfAbsences = 14,
                limitOfDelays = 14, // <-- Agrego límite de retrasos aquí
            } = s;
            faltasPorAsignatura[id] = {
                name,
                count: faltasCount[id] || 0,
                color,
                limit: limitOfAbsences,
            };
            retardosPorAsignatura[id] = {
                name,
                count: retardosCount[id] || 0,
                color,
                limit: limitOfDelays, // <-- Asigno límite para retrasos
            };
        });

        setAbsencesBySubject(faltasPorAsignatura);
        setDelaysBySubject(retardosPorAsignatura);
    };

    useEffect(() => {
        loadAbsences();
        window.addEventListener("storage", loadAbsences);
        return () => window.removeEventListener("storage", loadAbsences);
    }, []);

    const handleDeleteAbsence = (idToDelete) => {
        const updated = absences.filter((a) => a.id !== idToDelete);
        setAbsences(updated);
        localStorage.setItem("absences", JSON.stringify(updated));
        loadAbsences();
    };

    return (
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <AddBtn toggleFormOpen={() => setIsFormOpen(true)} />

            <AnimatePresence>
                {(isFormOpen ||
                    isAbsencesLimitSelectorOpen ||
                    isDelaysLimitSelectorOpen) && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
                        onClick={() => {
                            setIsFormOpen(false);
                            setIsAbsencesLimitSelectorOpen(false);
                            setIsDelaysLimitSelectorOpen(false);
                        }}
                    />
                )}
            </AnimatePresence>

            <AbsenceFormModal
                isFormOpen={isFormOpen}
                toggleFormOpen={() => {
                    setIsFormOpen(false);
                    loadAbsences();
                }}
            />

            <AbsencesLimitSelector
                isLimitSelectorOpen={isAbsencesLimitSelectorOpen}
                setIsLimitSelectorOpen={(open) =>
                    setIsAbsencesLimitSelectorOpen(open)
                } // <-- Cambio para pasar boolean directo
                onLimitsUpdated={loadAbsences}
            />
            <DelaysLimitSelector
                isLimitSelectorOpen={isDelaysLimitSelectorOpen}
                setIsLimitSelectorOpen={(open) =>
                    setIsDelaysLimitSelectorOpen(open)
                } // <-- Igual aquí
                onLimitsUpdated={loadAbsences}
            />
            <div className="grid gap-4">
                <AbsencesPerSubjectCard
                    absencesBySubject={absencesBySubject}
                    setIsLimitSelectorOpen={() =>
                        setIsAbsencesLimitSelectorOpen(true)
                    } // <-- Abrir explícitamente
                />

                <DelaysPerSubjectCard
                    delaysBySubject={delaysBySubject} // <-- Nombre de prop corregido para ser consistente
                    setIsLimitSelectorOpen={() =>
                        setIsDelaysLimitSelectorOpen(true)
                    } // <-- Abrir explícitamente
                />
            </div>
            <section>
                <header className="mb-4">
                    <h3 className="font-semibold text-xl font-poppins">
                        Faltas recientes
                    </h3>
                </header>
                <div className="flex flex-col-reverse gap-4">
                    {absences.length === 0 ? (
                        <p className="text-gray-600 font-poppins">
                            No hay faltas registradas.
                        </p>
                    ) : (
                        absences.map((absence) => (
                            <AbsenceCard
                                key={absence.id}
                                absence={absence}
                                onDelete={handleDeleteAbsence}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}

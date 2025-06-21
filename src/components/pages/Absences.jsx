import { useEffect, useState } from "react";
import AddBtn from "../AddBtn";
import AbsenceFormModal from "./modals/AbsencesFormModal";
import AbsencesPerSubjectCard from "../Cards/AbsencesPerSubjectCard";
import DelaysPerSubjectCard from "../Cards/DelaysPerSubjectCard";
import AbsencesLimitSelector from "../Selectors/AbsencesLimitSelector";
import DelaysLimitSelector from "../Selectors/DelaysLimitSelector";
import { motion, AnimatePresence } from "framer-motion";
import RecentAbsencesCard from "../Cards/RecentAbsencesCard";
import PageNull from "../PageNull";
import AllAbsencesCard from "../Cards/AllAbsencesCard";

export default function Absences() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAbsencesLimitSelectorOpen, setIsAbsencesLimitSelectorOpen] =
        useState(false);
    const [isDelaysLimitSelectorOpen, setIsDelaysLimitSelectorOpen] =
        useState(false);
    const [absences, setAbsences] = useState([]);
    const [absencesBySubject, setAbsencesBySubject] = useState({});
    const [delaysBySubject, setDelaysBySubject] = useState({});
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    const loadAbsences = () => {
        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        const stored = JSON.parse(localStorage.getItem("absences")) || [];

        // Enriquecer cada ausencia con color y nombre de asignatura
        const enrichedAbsences = stored.map((absence) => {
            const subject = subjects.find((s) => s.id === absence.subjectId);
            return {
                ...absence,
                subjectColor: subject?.color || "gray",
                subjectName: subject?.name || "Sin nombre",
            };
        });

        setAbsences(enrichedAbsences);

        // Separar por tipo
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
                color,
                limitOfAbsences = 14,
                limitOfDelays = 14,
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
                limit: limitOfDelays,
            };
        });

        setAbsencesBySubject(faltasPorAsignatura);
        setDelaysBySubject(retardosPorAsignatura);
    };

    const recentAbsences = [...absences].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );
    useEffect(() => {
        loadAbsences();
        window.addEventListener("storage", loadAbsences);
        return () => window.removeEventListener("storage", loadAbsences);
    }, []);

    const handleDeleteAbsence = (idToDelete) => {
        const updated = absences.filter((a) => a.id !== idToDelete);
        localStorage.setItem("absences", JSON.stringify(updated));
        loadAbsences();
    };

    return (
        <div
            className={`grid gap-4 xl:grid-cols-3 lg:grid-cols-2 p-6 ${
                subjects.length > 0 ? "" : "h-full"
            }`}
        >
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
                }
                onLimitsUpdated={loadAbsences}
            />
            <DelaysLimitSelector
                isLimitSelectorOpen={isDelaysLimitSelectorOpen}
                setIsLimitSelectorOpen={(open) =>
                    setIsDelaysLimitSelectorOpen(open)
                }
                onLimitsUpdated={loadAbsences}
            />
            {subjects.length > 0 ? (
                <>
                    <div className="grid gap-4 grid-rows-[min-content] row-start-2 sm:row-start-1">
                        <AbsencesPerSubjectCard
                            absencesBySubject={absencesBySubject}
                            setIsLimitSelectorOpen={() =>
                                setIsAbsencesLimitSelectorOpen(true)
                            }
                        />

                        <DelaysPerSubjectCard
                            delaysBySubject={delaysBySubject}
                            setIsLimitSelectorOpen={() =>
                                setIsDelaysLimitSelectorOpen(true)
                            }
                        />
                    </div>
                    {recentAbsences.length > 0 ? (
                        <>
                            <RecentAbsencesCard
                                recentAbsences={recentAbsences}
                                handleDeleteAbsence={handleDeleteAbsence}
                            />
                            <AllAbsencesCard
                                recentAbsences={recentAbsences}
                                handleDeleteAbsence={handleDeleteAbsence}
                            />
                        </>
                    ) : (
                        <div className="flex xl:col-span-2">
                            <PageNull
                                title={"Sin faltas"}
                                text={
                                    "Registra cuándo te ausentaste o llegaste tarde a clases"
                                }
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="flex lg:col-span-2 w-full xl:col-span-3">
                    <PageNull
                        title={"Sin faltas"}
                        text={
                            "Registra cuándo te ausentaste o llegaste tarde a clases"
                        }
                    />
                </div>
            )}
        </div>
    );
}

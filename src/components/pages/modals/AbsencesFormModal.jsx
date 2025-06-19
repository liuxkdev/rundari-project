import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AbsenceCategorySelector from "../../Selectors/AbsenceCategorySelector";
import SubjectSelector from "../../Selectors/SubjectSelector";
import LimitSelector from "../../Selectors/AbsencesLimitSelector";

export default function AbsenceFormModal({
    isFormOpen,
    toggleFormOpen,
    onLimitsUpdate,
}) {
    const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);
    const [isSelectSubjectOpen, setIsSelectSubjectOpen] = useState(false);
    const [attendanceType, setAttendanceType] = useState("");
    const [tempAttendanceType, setTempAttendanceType] = useState("");
    // Cambiamos a objeto para guardar id y nombre
    const [subject, setSubject] = useState(null);
    const [tempSubject, setTempSubject] = useState(null);
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");

    const handleCategorySelect = () => {
        if (tempAttendanceType) {
            setAttendanceType(tempAttendanceType);
            setIsSelectCategoryOpen(false);
        } else {
            alert("Selecciona una categoría antes de continuar.");
        }
    };

    // Ahora recibe un objeto {id, name}
    const handleSubjectSelect = (selectedSubject) => {
        if (selectedSubject && selectedSubject.id) {
            setSubject(selectedSubject);
            setIsSelectSubjectOpen(false);
        } else {
            alert("Selecciona una asignatura antes de continuar.");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!attendanceType || !reason.trim() || !date || !subject) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const absence = {
            id: Date.now(),
            type: attendanceType,
            subjectId: subject.id,
            subjectName: subject.name,
            reason: reason.trim(),
            date, // 👈 GUARDADO CORRECTO como string YYYY-MM-DD
        };

        const saved = JSON.parse(localStorage.getItem("absences")) || [];
        saved.push(absence);
        localStorage.setItem("absences", JSON.stringify(saved));

        handleClose();
        onLimitsUpdate(); // ✅ Ejecutar la función correctamente
    };

    const handleClose = () => {
        toggleFormOpen();
        setIsSelectCategoryOpen(false);
        setIsSelectSubjectOpen(false);
    };

    const closeCategorySelector = () => {
        setIsSelectCategoryOpen(false);
    };

    const closeSubjectSelector = () => {
        setIsSelectSubjectOpen(false);
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-white transition-transform sm:transition-all duration-300 transform z-50 p-8 sm:w-full sm:max-w-150 sm:m-auto sm:h-min sm:rounded-3xl shadow-lg ${
                    isFormOpen
                        ? "translate-y-0 sm:scale-100 sm:opacity-100"
                        : "translate-y-full sm:scale-50 sm:opacity-0"
                }`}
            >
                <div className="flex justify-between items-center sm:hidden">
                    <button onClick={handleClose} className="cursor-pointer">
                        <i className="bxr bxs-x text-2xl"></i>
                    </button>
                </div>

                <div className="mt-10 sm:m-0">
                    <header>
                        <h2 className="font-poppins text-2xl font-bold text-balance">
                            Registrar una falta
                        </h2>
                    </header>

                    <div className="mt-10">
                        <form onSubmit={handleSubmit}>
                            {/* Selector de categoría */}
                            <div
                                className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full"
                                onClick={() => {
                                    setTempAttendanceType(attendanceType);
                                    setIsSelectCategoryOpen(true);
                                }}
                            >
                                <i className="bxr bx-tag rounded-full text-2xl cursor-pointer mr-8"></i>
                                <span className="font-poppins text-base cursor-text">
                                    {attendanceType || "Seleccionar categoría"}
                                </span>
                            </div>

                            {/* Selector de asignatura */}
                            <div
                                className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full"
                                onClick={() => {
                                    setTempSubject(subject);
                                    setIsSelectSubjectOpen(true);
                                }}
                            >
                                <i className="bxr bx-book-bookmark text-2xl cursor-pointer mr-8"></i>
                                <span className="font-poppins text-base cursor-text">
                                    {subject
                                        ? subject.name
                                        : "Seleccionar asignatura"}
                                </span>
                            </div>

                            {/* Fecha */}
                            <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full">
                                <div className="w-6 h-6 mr-8 flex justify-center">
                                    <i className="bxr bx-calendar text-2xl cursor-pointer"></i>
                                </div>
                                <input
                                    type="date"
                                    className="text-base outline-0 placeholder:text-gray-700 font-poppins border-gray-500 text-gray-700 cursor-text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Motivo */}
                            <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full">
                                <div className="w-6 h-6 mr-8 flex justify-center">
                                    <i className="bxr bx-briefcase text-2xl cursor-pointer"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Motivo"
                                    className="text-base outline-0 placeholder:text-gray-700 font-poppins border-gray-500 text-gray-700"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Botón Guardar */}
                            <div className="flex mt-8 gap-4">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 text-base font-poppins w-full text-logo border border-logo rounded-lg cursor-pointer text-center hidden sm:block "
                                    type="button"
                                >
                                    Cancelar
                                </button>
                                <input
                                    type="submit"
                                    value="Guardar"
                                    className="px-4 py-2 text-base font-poppins w-full bg-logo text-white rounded-lg cursor-pointer"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Overlay oscuro al abrir selector */}
            <AnimatePresence>
                {(isSelectCategoryOpen || isSelectSubjectOpen) && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-50"
                        onClick={() => {
                            closeCategorySelector();
                            closeSubjectSelector();
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Selector de categoría */}
            <AbsenceCategorySelector
                isSelectCategoryOpen={isSelectCategoryOpen}
                closeCategorySelector={closeCategorySelector}
                setTempAttendanceType={setTempAttendanceType}
                tempAttendanceType={tempAttendanceType}
                handleCategorySelect={handleCategorySelect}
            />
            {/* Selector de asignatura */}
            <SubjectSelector
                isSelectSubjectOpen={isSelectSubjectOpen}
                closeSubjectSelector={closeSubjectSelector}
                setTempSubject={setTempSubject}
                tempSubject={tempSubject}
                handleSubjectSelect={handleSubjectSelect}
            />
            <LimitSelector />
        </>
    );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectSelector from "../../Selectors/SubjectSelector";
import DaySelector from "../../Selectors/DaySelector";

export default function ClassFormModal({
    isFormOpen,
    toggleFormOpen,
    classes,
    setClasses,
}) {
    const [subject, setSubject] = useState(null);
    const [tempSubject, setTempSubject] = useState(null);

    const [day, setDay] = useState("");
    const [tempDay, setTempDay] = useState(""); // <-- Estado temporal para día

    const [isSelectSubjectOpen, setIsSelectSubjectOpen] = useState(false);
    const [isSelectDayOpen, setIsSelectDayOpen] = useState(false);

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const handleSubjectSelect = (selectedSubject) => {
        if (selectedSubject && selectedSubject.id) {
            setSubject(selectedSubject);
            setIsSelectSubjectOpen(false);
        } else {
            alert("Selecciona una asignatura antes de continuar.");
        }
    };

    const handleDaySelect = (selectedDay) => {
        if (selectedDay) {
            setDay(selectedDay);
            setIsSelectDayOpen(false);
        } else {
            alert("Selecciona un día antes de continuar.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subject || !day || !start || !end) {
            alert("Por favor, completa todos los campos.");
            return;
        }


        const newClass = {
            id: Date.now(),
            subject: {
                id: subject.id,
                name: subject.name,
                color: subject.color || "blue",
                teacher: subject.teacher 
            },
            day,
            start,
            end,
        };

        const updated = [...classes, newClass];

        localStorage.setItem("classes", JSON.stringify(updated));

        setClasses(updated);

        handleClose();
    };

    const handleClose = () => {
        toggleFormOpen();
        setIsSelectSubjectOpen(false);
        setIsSelectDayOpen(false);

        setSubject(null);
        setTempSubject(null);

        setDay("");
        setTempDay("");

        setStart("");
        setEnd("");
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-white transition-transform sm:transition-all
        duration-300 transform z-40 p-8 sm:w-full sm:max-w-150 sm:m-auto sm:h-min sm:rounded-3xl shadow-lg ${
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
                            Añadir una clase
                        </h2>
                    </header>

                    <div className="mt-10">
                        <form onSubmit={handleSubmit}>
                            {/* Selector de asignatura */}
                            <div
                                className="grid grid-cols-[50px_1fr] items-center border-b border-gray-500 py-4 cursor-pointer"
                                onClick={() => {
                                    setTempSubject(subject);
                                    setIsSelectSubjectOpen(true);
                                }}
                            >
                                <i className="bx bx-book-bookmark text-2xl mr-8"></i>
                                <span className="font-poppins text-base text-gray-700">
                                    {subject
                                        ? subject.name
                                        : "Seleccionar asignatura"}
                                </span>
                            </div>

                            {/* Selector de día */}
                            <div
                                className="grid grid-cols-[50px_1fr] items-center border-b border-gray-500 py-4 cursor-pointer"
                                onClick={() => {
                                    setTempDay(day); // sincronizar día actual al abrir selector
                                    setIsSelectDayOpen(true);
                                }}
                            >
                                <i className="bx bx-calendar text-2xl mr-8"></i>
                                <span className="font-poppins text-base text-gray-700">
                                    {day ? day : "Seleccionar día"}
                                </span>
                            </div>

                            {/* Hora de inicio */}
                            <div className="grid grid-cols-[50px_1fr] items-center border-b border-gray-500 py-4">
                                <i className="bx bx-time-five text-2xl mr-8"></i>
                                <input
                                    type="time"
                                    className="text-base outline-0 font-poppins text-gray-700 w-full"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Hora de fin */}
                            <div className="grid grid-cols-[50px_1fr] items-center border-b border-gray-500 py-4">
                                <i className="bx bx-time text-2xl mr-8"></i>
                                <input
                                    type="time"
                                    className="text-base outline-0 font-poppins text-gray-700 w-full"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex mt-8 gap-4">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 text-base font-poppins w-full text-logo border border-logo rounded-lg hidden sm:block cursor-pointer"
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

            {/* Overlay oscuro para SubjectSelector */}
            <AnimatePresence>
                {isSelectSubjectOpen && (
                    <motion.div
                        key="overlay-subject"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-50"
                        onClick={() => setIsSelectSubjectOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Overlay oscuro para DaySelector */}
            <AnimatePresence>
                {isSelectDayOpen && (
                    <motion.div
                        key="overlay-day"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-50"
                        onClick={() => setIsSelectDayOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Selector de asignatura */}
            <SubjectSelector
                isSelectSubjectOpen={isSelectSubjectOpen}
                closeSubjectSelector={() => setIsSelectSubjectOpen(false)}
                setTempSubject={setTempSubject}
                tempSubject={tempSubject}
                handleSubjectSelect={handleSubjectSelect}
            />

            {/* Selector de día */}
            <DaySelector
                isOpen={isSelectDayOpen}
                closeDaySelector={() => setIsSelectDayOpen(false)}
                tempDay={tempDay}
                setTempDay={setTempDay}
                handleDaySelect={handleDaySelect}
            />
        </>
    );
}

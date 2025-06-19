import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectSelector from "../../Selectors/SubjectSelector";

export default function TaskFormModal({ isFormOpen, toggleFormOpen }) {
    const [taskName, setTaskName] = useState("");
    const [subject, setSubject] = useState(null);
    const [tempSubject, setTempSubject] = useState(null);
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [isSelectSubjectOpen, setIsSelectSubjectOpen] = useState(false);

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

        if (!taskName.trim() || !subject || !deadline || !description.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const task = {
            id: Date.now(),
            taskName: taskName.trim(),
            subjectName: subject.name,
            subjectColor: subject.color || "blue",
            deadline,
            description: description.trim(),
            completed: false,
        };

        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        saved.push(task);
        localStorage.setItem("tasks", JSON.stringify(saved));

        handleClose();
    };

    const handleClose = () => {
        toggleFormOpen();
        setIsSelectSubjectOpen(false);
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
                            Registrar una tarea
                        </h2>
                    </header>

                    <div className="mt-10">
                        <form onSubmit={handleSubmit}>
                            {/* Nombre de tarea */}
                            <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4">
                                <i className="bx bx-task text-2xl mr-8"></i>
                                <input
                                    type="text"
                                    placeholder="Nombre de la tarea"
                                    className="text-base outline-0 placeholder:text-gray-700 font-poppins text-gray-700 w-full"
                                    value={taskName}
                                    onChange={(e) =>
                                        setTaskName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Selector de asignatura */}
                            <div
                                className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 cursor-pointer"
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

                            {/* Fecha límite */}
                            <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4">
                                <i className="bx bx-calendar text-2xl mr-8"></i>
                                <input
                                    type="date"
                                    className="text-base outline-0 font-poppins text-gray-700 w-full"
                                    value={deadline}
                                    onChange={(e) =>
                                        setDeadline(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Descripción */}
                            <div className="grid grid-cols-[50px_1fr] items-start border-b-1 border-gray-500 py-4">
                                <i className="bx bx-briefcase text-2xl mt-1 mr-8"></i>
                                <textarea
                                    placeholder="Descripción"
                                    className="text-base outline-0 font-poppins text-gray-700 w-full placeholder:text-gray-700 resize-none"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex mt-8 gap-4">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 text-base font-poppins w-full text-logo border border-logo rounded-lg hidden sm:block"
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

            {/* Overlay oscuro */}
            <AnimatePresence>
                {isSelectSubjectOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
                        onClick={closeSubjectSelector}
                    />
                )}
            </AnimatePresence>

            {/* Selector de asignatura */}
            <SubjectSelector
                isSelectSubjectOpen={isSelectSubjectOpen}
                closeSubjectSelector={closeSubjectSelector}
                setTempSubject={setTempSubject}
                tempSubject={tempSubject}
                handleSubjectSelect={handleSubjectSelect}
            />
        </>
    );
}

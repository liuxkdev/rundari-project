import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorPicker from "../../Selectors/ColorPicker";

export default function SubjectFormModal({ isFormOpen, toggleFormOpen }) {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [colorSelected, setColorSelected] = useState("blue");
    const [subjectName, setSubjectName] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subjectName.trim() || !teacherName.trim() || !colorSelected) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const newSubject = {
            id: crypto.randomUUID(),
            name: subjectName,
            color: colorSelected,
            limitOfAbsences: 14,
            limitOfDelays: 14,
            teacher: teacherName,
        };

        const existing = JSON.parse(localStorage.getItem("subjects")) || [];
        localStorage.setItem(
            "subjects",
            JSON.stringify([...existing, newSubject])
        );

        setSubjectName("");
        setTeacherName("");
        setColorSelected("blue");
        toggleFormOpen();
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-white transition-transform sm:transition-all
                duration-300 transform z-40 p-8 sm:w-full sm:max-w-150 sm:m-auto sm:h-min sm:rounded-3xl shadow-lg ${
                    isFormOpen
                        ? "translate-y-0 sm:scale-100 sm:opacity-100 "
                        : "translate-y-full sm:scale-50 sm:opacity-0 "
                }`}
            >
                <div className="flex justify-between items-center sm:hidden">
                    <button onClick={toggleFormOpen} className="cursor-pointer">
                        <i className="bxr bxs-x text-2xl"></i>
                    </button>
                </div>
                <div className="mt-10 sm:m-0">
                    <header>
                        <h2 className="font-poppins text-2xl font-bold text-balance">
                            Añadir una nueva asignatura
                        </h2>
                    </header>
                    <div className="mt-10">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full">
                                <div className="w-6 h-6 mr-8"></div>
                                <input
                                    type="text"
                                    placeholder="Añadir nombre"
                                    value={subjectName}
                                    onChange={(e) =>
                                        setSubjectName(e.target.value)
                                    }
                                    required
                                    className="text-base outline-0 font-poppins placeholder:text-gray-700 text-gray-700"
                                />
                            </div>
                            <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full">
                                <div
                                    className={`rounded-full bgcolor-${colorSelected} w-6 h-6 cursor-pointer mr-8 outline-gray-700 outline-2`}
                                    onClick={() => setIsColorPickerOpen(true)}
                                ></div>
                                <span
                                    className="font-poppins text-base cursor-pointer"
                                    onClick={() => setIsColorPickerOpen(true)}
                                >
                                    Elegir Color
                                </span>
                            </div>
                            <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full">
                                <div className="w-6 h-6 mr-8 flex justify-center">
                                    <i className="bxr bx-briefcase text-2xl"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Añadir profesor"
                                    value={teacherName}
                                    onChange={(e) =>
                                        setTeacherName(e.target.value)
                                    }
                                    className="text-base outline-0 placeholder:text-gray-700 font-poppins border-gray-500 text-gray-700"
                                />
                            </div>
                            <div className="flex mt-8 gap-4">
                                <button
                                    onClick={toggleFormOpen}
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
            <ColorPicker
                setIsColorPickerOpen={setIsColorPickerOpen}
                setColorSelected={setColorSelected}
                isColorPickerOpen={isColorPickerOpen}
            />
            <AnimatePresence>
                {isColorPickerOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-50"
                        onClick={() => setIsColorPickerOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

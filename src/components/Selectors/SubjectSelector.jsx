import { useEffect, useState } from "react";

export default function SubjectSelector({
    isSelectSubjectOpen,
    closeSubjectSelector,
    setTempSubject,
    handleSubjectSelect,
}) {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const savedSubjects =
            JSON.parse(localStorage.getItem("subjects")) || [];
        setSubjects(savedSubjects);
    }, []);

    const handleSelection = (subject) => {
        setTempSubject(subject); // guardamos el objeto completo
        handleSubjectSelect(subject); // pasamos el objeto completo al padre
    };

    return (
        <div
            className={`fixed bottom-0 right-0 left-0 bg-white transition-transform duration-300 transform z-40 rounded-t-3xl py-6 px-10 flex flex-col flex-start h-min sm:hidden shadow-[0_-1rem_1rem_#0000001f] ${
                isSelectSubjectOpen ? "translate-y-0" : "translate-y-[200%]"
            }`}
        >
            <div className="flex justify-center mb-3">
                <button
                    type="button"
                    onClick={closeSubjectSelector}
                    className="cursor-pointer"
                >
                    <i
                        className={`bxr bx-chevron-up text-3xl transition-[rotate] duration-300 ${
                            isSelectSubjectOpen ? "rotate-180" : ""
                        }`}
                    ></i>
                </button>
            </div>

            <header>
                <h3 className="text-xl font-medium font-poppins mb-8">
                    Seleccionar asignatura
                </h3>
            </header>

            <div className="mb-4">
                {subjects.length === 0 ? (
                    <p className="text-gray-600 font-poppins">
                        No hay asignaturas guardadas.
                    </p>
                ) : (
                    <div className="flex flex-col gap-2">
                        {subjects.map((subject) => (
                            <div
                                key={subject.id}
                                className="flex items-center bg-gray-100 cursor-pointer p-4 rounded-lg"
                                onClick={() => handleSelection(subject)} // <-- aquí enviamos el objeto entero
                            >
                                <div
                                    className={`bgcolor-${subject.color} h-4 w-4 rounded-full`}
                                ></div>
                                <label className="text-base font-poppins ml-4 text-gray-700 cursor-pointer">
                                    {subject.name}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

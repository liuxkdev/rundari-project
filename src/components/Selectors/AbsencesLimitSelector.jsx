import { useEffect, useState } from "react";

export default function LimitSelector({
    isLimitSelectorOpen,
    setIsLimitSelectorOpen,
    onLimitsUpdated,
}) {
    const [subjects, setSubjects] = useState([]);
    const [tempSubjects, setTempSubjects] = useState([]);

    // Cargar asignaturas cada vez que se abre el selector
    useEffect(() => {
        if (isLimitSelectorOpen) {
            const savedSubjects =
                JSON.parse(localStorage.getItem("subjects")) || [];
            setSubjects(savedSubjects);
            setTempSubjects(savedSubjects);
        }
    }, [isLimitSelectorOpen]);

    const handleLimitChange = (subjectId, newLimit) => {
        const updatedSubjects = tempSubjects.map((subject) =>
            subject.id === subjectId
                ? { ...subject, limitOfAbsences: Number(newLimit) }
                : subject
        );
        setTempSubjects(updatedSubjects);
    };

    const handleSave = () => {
        setSubjects(tempSubjects);
        localStorage.setItem("subjects", JSON.stringify(tempSubjects));
        setIsLimitSelectorOpen(false);
        onLimitsUpdated();
    };

    const handleCancel = () => {
        setIsLimitSelectorOpen(false);
    };

    return (
        <div
            className={`fixed bottom-0 right-0 left-0 bg-white transition-transform sm:w-full sm:max-w-150 sm:m-auto sm:h-min sm:max-h-100 sm:top-0 sm:rounded-3xl sm:transition-all
                duration-300 transform z-40 rounded-t-3xl p-10 flex flex-col flex-start h-min shadow-[0_-1rem_1rem_#0000001f] ${
                    isLimitSelectorOpen
                        ? "translate-y-0 sm:opacity-100 sm:scale-100"
                        : "translate-y-full sm:opacity-0 sm:scale-50"
                }`}
        >
            <div className="flex justify-center mb-3 sm:hidden">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="cursor-pointer"
                    aria-label="Cerrar selector"
                >
                    <i
                        className={`bx bxs-chevron-down text-3xl transition-transform duration-300 ${
                            isLimitSelectorOpen ? "rotate-180" : ""
                        }`}
                    ></i>
                </button>
            </div>

            <header className="text-xl font-poppins font-semibold mb-6">
                Establecer límite de faltas por asignatura
            </header>

            <div className="flex flex-col gap-4 overflow-y-auto">
                {tempSubjects.length === 0 ? (
                    <p className="text-gray-600 font-poppins">
                        No hay asignaturas registradas.
                    </p>
                ) : (
                    tempSubjects.map((subject) => (
                        <div
                            key={subject.id}
                            className="flex items-center justify-between p-3 rounded-lg"
                        >
                            <fieldset className="border border-gray-500 rounded-lg w-full">
                                <legend className="ml-5 font-poppins px-2">
                                    {subject.name}
                                </legend>
                                <input
                                    type="number"
                                    min="1"
                                    className="px-5 pb-2 outline-0 w-full font-poppins"
                                    value={subject.limitOfAbsences || 14}
                                    onChange={(e) =>
                                        handleLimitChange(
                                            subject.id,
                                            e.target.value
                                        )
                                    }
                                />
                            </fieldset>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-end gap-8 mt-6">
                <button
                    type="button"
                    className="font-poppins text-logo"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    className="font-poppins text-gray-700"
                    onClick={handleSave}
                >
                    Establecer
                </button>
            </div>
        </div>
    );
}

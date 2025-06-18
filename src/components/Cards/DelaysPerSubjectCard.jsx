export default function DelaysPerSubjectCard({
    delaysBySubject,
    setIsLimitSelectorOpen,
}) {
    return (
        <article className="min-h-50 w-full shadow-md rounded-2xl p-4 grid grid-rows-[auto_1fr_auto] bg-white">
            <header>
                <h3 className="font-poppins font-semibold text-xl text-gray-700">
                    Retardos por Asignatura
                </h3>
            </header>

            <div className="py-4 border-b-1 border-gray-300">
                <ul className="font-poppins text-gray-700">
                    {Object.keys(delaysBySubject).length === 0 ? (
                        <p className="text-gray-600">
                            No hay asignaturas registradas.
                        </p>
                    ) : (
                        Object.entries(delaysBySubject).map(
                            ([subjectId, { name, count, color, limit }]) => {
                                const validLimit = Number(limit) || 1;
                                const progress = Math.min(
                                    (count / validLimit) * 100,
                                    100
                                );

                                return (
                                    <li key={subjectId} className="mb-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                {/* Color dinámico del punto */}
                                                <div
                                                    className={`h-5 w-5 rounded-full bgcolor-${color}`}
                                                ></div>
                                                <span>{name}</span>
                                            </div>
                                            <span>
                                                {count}/{limit}
                                            </span>
                                        </div>

                                        {/* Barra de progreso */}
                                        <div className="w-full h-4 mt-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full bgcolor-${color}`}
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </li>
                                );
                            }
                        )
                    )}
                </ul>
            </div>

            <div className="mt-2 flex items-center gap-4">
                <i className="bx bx-chevron-right text-2xl text-gray-500 cursor-pointer"></i>
                <button
                    type="button"
                    className="font-poppins text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                    onClick={() => setIsLimitSelectorOpen(true)}
                >
                    Establecer límites
                </button>
            </div>
        </article>
    );
}

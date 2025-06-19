export default function AbsenceCard({ absence, onDelete }) {
    const { id, type, reason, date, subjectColor, subjectName } = absence;

    const getFechaConTexto = (fechaString) => {
        const hoy = new Date();
        const fecha = new Date(`${fechaString}T00:00:00`);

        const diferenciaEnDias = Math.floor(
            (hoy - fecha) / (1000 * 60 * 60 * 24)
        );

        if (diferenciaEnDias === 0) return "Hoy";
        if (diferenciaEnDias === 1) return "Ayer";

        return fecha.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div
            key={id}
            className={`bg-white shadow rounded-xl p-4 border-l-8 border-color-${subjectColor} grid grid-cols-4 items-center`}
        >
            <div className="col-span-3">
                <h3 className="font-semibold font-poppins text-lg">{type}</h3>
                <p className="text-sm font-poppins text-gray-500">
                    {subjectName} - {getFechaConTexto(date)}
                </p>
                <p className="text-sm font-poppins text-gray-700 truncate">
                    Motivo: {reason}
                </p>
            </div>
            <button
                type="button"
                onClick={() => onDelete(id)}
                className="justify-self-end"
            >
                <i className="bxr bx-trash text-2xl cursor-pointer text-gray-500"></i>
            </button>
        </div>
    );
}

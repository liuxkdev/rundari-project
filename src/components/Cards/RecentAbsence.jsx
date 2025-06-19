export default function RecentAbsence({ absence }) {
    const { id, type, date, subjectColor, subjectName } = absence;

    const getFechaConTexto = (fechaString) => {
        const hoy = new Date();
        const fecha = new Date(`${fechaString}T00:00:00`);

        const diferenciaEnDias = Math.floor(
            (hoy.setHours(0, 0, 0, 0) - fecha.getTime()) / (1000 * 60 * 60 * 24)
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
        <article
            key={id}
            className="flex items-center border-b pb-3 border-gray-300 last:border-0"
        >
            <div
                className={`bgcolor-${subjectColor} h-10 w-10 rounded-full mr-4`}
            ></div>
            <div>
                <p className="text-base text-gray-700 font-poppins">
                    <span>{type}</span> - {getFechaConTexto(date)}
                </p>
                <p className="font-poppins text-sm text-gray-500">
                    {subjectName}
                </p>
            </div>
        </article>
    );
}

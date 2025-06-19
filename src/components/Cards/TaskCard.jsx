export default function TaskCard({ task, onToggleComplete, onDelete }) {
    const {
        id,
        name,
        subject,
        deadline, // formato completo: "YYYY-MM-DDTHH:mm"
        description,
        completed,
    } = task;

    // 🔧 Función para parsear fecha y hora como local
    const parseLocalDateTime = (datetimeStr) => {
        const [datePart, timePart] = datetimeStr.split("T");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hour, minute);
    };

    const getFechaConTexto = (fechaString) => {
        const hoy = new Date();
        const fecha = parseLocalDateTime(fechaString);

        // Normalizar a solo fecha local
        const toLocalDateOnly = (d) =>
            new Date(d.getFullYear(), d.getMonth(), d.getDate());

        const hoySolo = toLocalDateOnly(hoy).getTime();
        const fechaSolo = toLocalDateOnly(fecha).getTime();

        const ayerSolo = new Date(hoy);
        ayerSolo.setDate(hoy.getDate() - 1);

        let fechaTexto;
        if (fechaSolo === hoySolo) {
            fechaTexto = "Hoy";
        } else if (fechaSolo === toLocalDateOnly(ayerSolo).getTime()) {
            fechaTexto = "Ayer";
        } else {
            fechaTexto = fecha.toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }

        const horaTexto = fecha.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${fechaTexto} a las ${horaTexto}`;
    };

    return (
        <article
            className={`bg-white shadow-md rounded-xl p-4 grid border-l-8 border-logo grid-cols-[1fr_100px] items-center  gap-4 h-min`}
        >
            <div className="overflow-hidden">
                <div className="grid items-center gap-x-4 grid-rows-2 grid-cols-[auto_1fr]">
                    <button
                        onClick={() => onToggleComplete(id)}
                        className={`text-sm font-poppins w-7 h-7 rounded-full cursor-pointer border-2 border-logo flex ${
                            completed ? "bg-logo" : ""
                        }`}
                    >
                        <i className="bx bx-check text-white m-auto"></i>
                    </button>
                    <h3
                        className={`text-lg font-poppins font-semibold truncate ${
                            completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                        }`}
                    >
                        {name}
                    </h3>
                    <div className="col-start-2 flex items-center">
                        <div
                            className={`h-4 w-4 rounded-full mr-2 bgcolor-${subject.color}`}
                        ></div>
                        <p className="text-sm font-poppins text-gray-500">
                            {subject.name}
                        </p>
                    </div>
                    <p
                        className="text-sm font-poppins text-gray-700 col-start-2 line-clamp-3 overflow-hidden "
                        title={description}
                    >
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end justify-start h-full">
                <p
                    className={`text-sm px-2 py-1 rounded font-poppins ${
                        completed
                            ? "bg-green text-green-800"
                            : "bg-yellow text-yellow-800"
                    }`}
                >
                    {completed ? "Completada" : "Pendiente"}
                </p>
                <button
                    onClick={() => onDelete(id)}
                    className="text-gray-500 text-2xl cursor-pointer mt-4"
                >
                    <i className="bx bx-trash"></i>
                </button>
            </div>
            <p className="text-sm font-poppins text-gray-500 col-span-2 text-end">
                {getFechaConTexto(deadline)}
            </p>
        </article>
    );
}

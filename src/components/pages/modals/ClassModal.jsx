export default function ClassModal({
    isModalOpen,
    toggleModalOpen,
    selectedClass,
    setClasses,
}) {
    const preventClass = {
        id: 0,
        subject: {
            name: "",
            color: "",
            teacher: "",
        },
        day: "",
        start: "",
        end: "",
    };

    const handleDelete = () => {
        const stored = JSON.parse(localStorage.getItem("classes")) || [];
        const updated = stored.filter((cls) => cls.id !== selectedClass.id);
        localStorage.setItem("classes", JSON.stringify(updated));
        setClasses(updated);
        toggleModalOpen();
    };

    const { id, subject, day, start, end } = selectedClass || preventClass;

    return (
        <>
            <div
                className={`fixed left-0 right-0 bottom-0 sm:inset-0 bg-white transition-transform  sm:transition-all
        duration-300 z-50 p-8 sm:w-full sm:max-w-150 sm:m-auto h-min sm:rounded-3xl rounded-t-3xl shadow-lg ${
            isModalOpen
                ? "translate-y-0 sm:scale-100 sm:opacity-100"
                : "translate-y-full sm:scale-50 sm:opacity-0"
        }`}
            >
                <div className="flex justify-between items-center sm:hidden">
                    <button
                        onClick={toggleModalOpen}
                        className="cursor-pointer"
                    >
                        <i className="bxr bxs-x text-2xl"></i>
                    </button>
                </div>

                <div className="mt-10 sm:m-0">
                    <header className="flex items-center">
                        <div
                            className={`h-6 w-6 mr-4 bgcolor-${subject.color} rounded-full`}
                        />
                        <h2 className="font-poppins text-2xl font-bold text-balance truncate">
                            Clase de {subject.teacher}
                        </h2>
                    </header>

                    <div className="mt-10">
                        <div className="grid grid-cols-[50px_1fr] items-center border-b border-gray-500 py-4 cursor-pointer">
                            <i className="bx bx-calendar text-2xl mr-8"></i>
                            <span className="font-poppins text-base text-gray-700">
                                {day}
                            </span>
                        </div>

                        <div className="grid grid-cols-[50px_1fr] items-center border-b border-gray-500 py-4">
                            <i className="bx bx-time-five text-2xl mr-8"></i>
                            <span className="font-poppins text-base text-gray-700">
                                {start} - {end}
                            </span>
                        </div>
                        <div className="flex mt-8 gap-4 flex-col sm:flex-row">
                            <button
                                type="button"
                                onClick={toggleModalOpen}
                                className="px-4 py-2 text-base font-poppins w-full bg-logo text-white rounded-lg cursor-pointer"
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-base font-poppins w-full text-logo border border-logo rounded-lg cursor-pointer"
                                type="button"
                            >
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

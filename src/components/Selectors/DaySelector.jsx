export default function DaySelector({
    isOpen, // antes isSelectCategoryOpen
    closeDaySelector, // antes closeCategorySelector
    tempDay,
    setTempDay,
    handleDaySelect,
}) {
    const days = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    return (
        <div
            className={`fixed bottom-0 right-0 left-0 bg-white transition-transform duration-300 transform z-60 rounded-t-3xl py-6 px-10 flex flex-col flex-start h-min shadow-[0_-1rem_1rem_#0000001f] max-w-170 m-auto ${
                isOpen ? "translate-y-0" : "translate-y-[150%]"
            }`}
        >
            <div className="flex justify-center mb-3">
                <button
                    type="button"
                    onClick={closeDaySelector}
                    className="cursor-pointer"
                >
                    <i
                        className={`bxr bx-chevron-up text-3xl transition-[rotate] duration-300 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    ></i>
                </button>
            </div>

            <header>
                <h3 className="text-xl font-medium font-poppins mb-8">
                    Seleccionar día
                </h3>
            </header>

            <div className="mb-4">
                <form className="flex flex-col gap-4">
                    {days.map((day) => (
                        <div key={day} className="flex items-center">
                            <input
                                type="radio"
                                name="day"
                                id={day}
                                value={day}
                                className="w-5 h-5"
                                checked={tempDay === day}
                                onChange={(e) => setTempDay(e.target.value)}
                            />
                            <label
                                htmlFor={day}
                                className="text-base font-poppins ml-4 text-gray-700"
                            >
                                {day}
                            </label>
                        </div>
                    ))}
                </form>

                <div className="flex justify-end gap-8 mt-6">
                    <button
                        type="button"
                        className="font-poppins text-logo"
                        onClick={closeDaySelector}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="font-poppins text-gray-700"
                        onClick={() => {
                            handleDaySelect(tempDay);
                        }}
                    >
                        Seleccionar
                    </button>
                </div>
            </div>
        </div>
    );
}

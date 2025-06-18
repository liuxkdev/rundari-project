export default function AbsenceCategorySelector({isSelectCategoryOpen, closeCategorySelector,setTempAttendanceType, tempAttendanceType, handleCategorySelect}) {
    return (
            <div
                className={`fixed bottom-0 right-0 left-0 bg-white transition-transform duration-300 transform z-50 rounded-t-3xl py-6 px-10 flex flex-col flex-start h-min shadow-[0_-1rem_1rem_#0000001f] max-w-170 m-auto ${
                    isSelectCategoryOpen ? "translate-y-0" : "translate-y-[150%]"
                }`}
            >
                <div className="flex justify-center mb-3">
                    <button
                        type="button"
                        onClick={closeCategorySelector}
                        className="cursor-pointer"
                    >
                        <i
                            className={`bxr bx-chevron-up text-3xl transition-[rotate] duration-300 ${
                                isSelectCategoryOpen ? "rotate-180" : ""
                            }`}
                        ></i>
                    </button>
                </div>

                <header>
                    <h3 className="text-xl font-medium font-poppins mb-8">
                        Seleccionar categoría
                    </h3>
                </header>

                <div className="mb-4">
                    <form className="flex flex-col gap-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="attendance"
                                id="falta"
                                value="Falta"
                                checked={tempAttendanceType === "Falta"}
                                className="w-5 h-5"
                                onChange={(e) =>
                                    setTempAttendanceType(e.target.value)
                                }
                            />
                            <label
                                htmlFor="falta"
                                className="text-base font-poppins ml-4 text-gray-700"
                            >
                                Falta
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="attendance"
                                id="retardo"
                                value="Retardo"
                                className="w-5 h-5"
                                checked={tempAttendanceType === "Retardo"}
                                onChange={(e) =>
                                    setTempAttendanceType(e.target.value)
                                }
                            />
                            <label
                                htmlFor="retardo"
                                className="text-base font-poppins ml-4 text-gray-700"
                            >
                                Retardo
                            </label>
                        </div>
                    </form>

                    <div className="flex justify-end gap-8 mt-6">
                        <button
                            type="button"
                            className="font-poppins text-logo"
                            onClick={closeCategorySelector}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="font-poppins text-gray-700"
                            onClick={handleCategorySelect}
                        >
                            Seleccionar
                        </button>
                    </div>
                </div>
            </div>
    );
}

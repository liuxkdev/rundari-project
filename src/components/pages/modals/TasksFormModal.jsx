import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function TaskFormModal({ isFormOpen, toggleFormOpen }) {

 


    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [colorSelected, setColorSelected] = useState("blue");

    return (
       <div
            className={`fixed inset-0 bg-white transition-transform sm:transition-all
                duration-300 transform z-40 p-8 sm:w-full sm:max-w-150 sm:m-auto sm:h-min sm:rounded-3xl shadow-lg ${
                    isFormOpen
                        ? "translate-y-0 sm:scale-100 sm:opacity-100 sm:translate-y-0"
                        : "translate-y-full sm:scale-50 sm:opacity-0 sm:translate-y-0"
                }`}
        >
            <div className="flex justify-between items-center">
                <button onClick={toggleFormOpen} className="cursor-pointer">
                    <i className="bxr bxs-x text-2xl"></i>
                </button>
            </div>
            <div className="mt-10">
                <header>
                    <h2 className="font-poppins text-2xl font-bold text-balance">
                        Añadir una nueva Tarea
                    </h2>
                </header>
                <div className="mt-10">
                    <form>
                        <div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full">
                            <div className="w-6 h-6 mr-8"></div>
                            <input
                                type="text"
                                placeholder="Añadir Tarea"
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
                                type="date"
                                placeholder="Fecha de Entrega"
                                className="text-base outline-0 placeholder:text-gray-700 font-poppins border-gray-500 text-gray-700"
                            />
                        </div>

<div className="grid grid-cols-[50px_1fr] items-center border-b-1 border-gray-500 py-4 text-gray-700 w-full">
                            <div className="w-6 h-6 mr-8"></div>
                            <input
                                type="text"
                                placeholder="Añadir Descripción"
                                required
                                className="text-base outline-0 font-poppins placeholder:text-gray-700 text-gray-700"
                            />
                        </div>

                        <div className="flex mt-8">
                            <div></div>
                            <input
                                type="submit"
                                value="Guardar"
                                className="px-4 py-2 text-base font-poppins w-full bg-blue text-white rounded-lg"
                            />
                        </div>
                    </form>
                </div>
            </div>

            <AnimatePresence>
                {isColorPickerOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-40 sm:hidden"
                        onClick={() => setIsColorPickerOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div
                className={`fixed bottom-0 right-0 left-0 bg-white transition-transform
                duration-300 transform z-40 rounded-t-3xl px-4 py-6 flex flex-col flex-start h-[70%] sm:hidden shadow-[0_-1rem_1rem_#0000001f] ${
                    isColorPickerOpen ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <div className="flex justify-center mb-3">
                    <button
                        type="button"
                        onClick={() => setIsColorPickerOpen(false)}
                        className="cursor-pointer"
                    >
                        <i
                            className={`bxr bx-chevron-up text-3xl transition-[rotate] duration-300 ${
                                isColorPickerOpen ? "rotate-180" : ""
                            }`}
                        ></i>
                    </button>
                </div>
                <div className="grid grid-cols-3 grid-rows-2 h-50 gap-2">
                    {[
                        "blue",
                        "blue-light",
                        "green",
                        "green-light",
                        "yellow",
                        "red",
                    ].map((color) => (
                        <button
                            key={color}
                            type="button"
                            className={`bgcolor-${color} cursor-pointer rounded-xl`}
                            onClick={() => {
                                setColorSelected(color);
                                setIsColorPickerOpen(false);
                            }}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}

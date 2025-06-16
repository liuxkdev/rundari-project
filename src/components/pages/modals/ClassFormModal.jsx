export default function ClassFormModal({ isFormOpen, toggleFormOpen }) {
    return (
        <div
            className={`fixed inset-0 bg-white transition-transform sm:transition-all
                duration-300 transform z-40 rounded-t-3xl grid px-4 py-6 grid-rows-[auto_1fr] sm:w-100 sm:m-auto sm:h-min sm:rounded-3xl ${
                    isFormOpen
                        ? "translate-y-0 sm:scale-100 sm:opacity-100 sm:translate-y-0"
                        : "translate-y-full sm:scale-50 sm:opacity-0 sm:translate-y-0"
                }`}
        >
            <div className="flex justify-between items-center">
                <button onClick={toggleFormOpen} className="cursor-pointer">
                    <i className="bxr  bxs-x text-2xl"></i>
                </button>
                <button
                    onClick={toggleFormOpen}
                    className="bg-blue-light py-2 px-4 rounded-xl font-poppins text-sm"
                >
                    Guardar
                </button>
            </div>
            <form action="">
                <h2>Añadir Clase</h2>
            </form>
        </div>
    );
}

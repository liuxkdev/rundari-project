import Nav from "./Nav";

export default function Sidebar({ isOpen, toggleSidebar, tasks = [] }) {
    const now = new Date();

    const upcomingTask = tasks
        .filter((task) => !task.completed && new Date(task.deadline) >= now)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

    return (
        <aside
            className={`sm:shadow-none shadow-xl fixed sm:static bg-white h-[100dvh] w-[240px] z-40 transition-transform duration-300 grid grid-rows-[auto_1fr_auto] rounded-tr-2xl ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
            }`}
        >
            <header className="px-4 pt-4">
                <div className="flex justify-between border-b-gray-300 border-b pb-4 items-center">
                    <h1 className="font-savate text-xl text-logo font-bold">
                        RUNDARI
                    </h1>
                    <button
                        className="sm:hidden cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        <i className="bxr bxs-x"></i>
                    </button>
                </div>
            </header>

            <Nav toggleSidebar={toggleSidebar} />

            <footer className="p-4 max-w-full">
                <div className="border-t-gray-300 border-t pt-4">
                    <div className="p-3 bg-gray-100 rounded-xl overflow-hidden">
                        <p className="text-xs text-gray-500 font-poppins mb-1">
                            Próxima entrega
                        </p>

                        {upcomingTask ? (
                            <div className="overflow-hidden">
                                <p className="font-poppins text-sm font-medium truncate">
                                    {upcomingTask.name}
                                </p>
                                <div className="grid grid-cols-[12px_1fr] items-center gap-2 mt-1">
                                    <span
                                        className={`w-3 h-3 rounded-full bgcolor-${upcomingTask.subject.color}`}
                                    ></span>
                                    <span className="text-xs text-gray-500 font-poppins">
                                        {upcomingTask.subject?.name ||
                                            "Sin materia"}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p className="font-poppins text-sm font-medium text-gray-400 ">
                                Sin tareas pendientes
                            </p>
                        )}
                    </div>
                </div>
            </footer>
        </aside>
    );
}

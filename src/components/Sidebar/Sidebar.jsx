import Nav from "./Nav";

export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <aside
            className={`sm:shadow-none shadow-xl fixed sm:static bg-white h-full w-[240px] z-40 transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
            }`}
        >
            <header className="px-4 pt-4">
                <div className="flex justify-between border-b-gray-300 border-b pb-4 items-center">
                    <h1 className="font-savate text-xl text-logo font-semibold">
                        RUNDARI
                    </h1>
                    <button className="sm:hidden cursor-pointer" onClick={ toggleSidebar }>
                        <i className="bxr  bxs-x bx-rotate-180"></i>
                    </button>
                </div>
            </header>
            <Nav />
            <footer className="p-4 max-w-full">
                <div className="border-t-gray-300 border-t pt-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                        <p className="text-xs text-gray-500 font-poppins mb-1">
                            Próxima entrega
                        </p>
                        <div className="overflow-hidden flex justify-between items-center">
                            <span className="font-poppins text-sm truncate font-medium">
                                Sin tareas pendientes
                            </span>
                            <span className="px-2 py-1 text-xs"></span>
                        </div>
                    </div>
                </div>
            </footer>
        </aside>
    );
}

export default function Header({ title, toggleSidebar }) {
    return (
        <header className="flex p-4 ">
            <button onClick={toggleSidebar} className="sm:hidden mr-4 text-xl cursor-pointer">
                <i className="bx bxs-menu"></i>
            </button>
            <div>
                <h2 className="font-poppins text-lg font-medium">{title}</h2>
            </div>
        </header>
    );
}

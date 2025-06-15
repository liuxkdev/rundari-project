export default function Header({ title, toggleSidebar }) {
    return (
        <header className="flex p-4 items-end">
            <button
                onClick={toggleSidebar}
                className="sm:hidden mr-10 cursor-pointer"
            >
                <i className="bxr bx-menu-wide text-xl"></i>
            </button>
            <div>
                <h2 className="font-poppins text-xl font-medium">{title}</h2>
            </div>
        </header>
    );
}

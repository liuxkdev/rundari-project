export default function Header({ title }) {
    return (
        <header className="flex items-center p-4">
            <div className="hidden">
                <button>
                    <i className="bxr  bxs-menu-close bx-rotate-180"></i>
                </button>
            </div>
            <div>
                <h2 className="font-poppins text-lg font-medium">{ title }</h2>
            </div>
        </header>
    );
}

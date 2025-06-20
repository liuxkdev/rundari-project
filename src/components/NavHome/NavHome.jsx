import NavHomeLink from "./NavHomeLink";

export default function NavHome() {
    return (
        <nav className="w-full flex justify-center m-auto">
            <ul className="flex overflow-x-auto gap-4 px-4">
                <li>
                    <NavHomeLink
                        target="/schedule"
                        icon="bxr bx-calendar-alt"
                        text="Horario"
                    />
                </li>
                <li>
                    <NavHomeLink
                        target="/subjects"
                        icon="bxr bx-book-alt"
                        text="Materias"
                    />
                </li>
                <li>
                    <NavHomeLink
                        target="/tasks"
                        icon="bxr bx-checklist"
                        text="Tareas"
                    />
                </li>
                <li>
                    <NavHomeLink
                        target="/absences"
                        icon="bxr bx-chart-bar-rows"
                        text="Faltas"
                    />
                </li>
            </ul>
        </nav>
    );
}

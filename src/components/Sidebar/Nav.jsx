import NavLinkClient from "./NavLinkClient";

export default function Nav({ toggleSidebar }) {
    return (
        <nav className="py-4 overflow-y-auto">
            <ul>
                <li className="mb-1">
                    <NavLinkClient
                        target="/"
                        icon="bxr bxs-home-alt"
                        text="Inicio"
                        toggleSidebar={toggleSidebar}
                    />
                </li>
                <li className="mb-1">
                    <NavLinkClient
                        target="/schedule"
                        icon="bxr bxs-calendar-alt"
                        text="Horario"
                        toggleSidebar={toggleSidebar}
                    />
                </li>
                <li className="mb-1">
                    <NavLinkClient
                        target="/subjects"
                        icon="bxr bxs-book"
                        text="Asignaturas"
                        toggleSidebar={toggleSidebar}
                    />
                </li>
                <li className="mb-1">
                    <NavLinkClient
                        target="/tasks"
                        icon="bxr bxs-checklist"
                        text="Tareas"
                        toggleSidebar={toggleSidebar}
                    />
                </li>
                <li className="mb-1">
                    <NavLinkClient
                        target="/absences"
                        icon="bxr bxs-chart-bar-rows"
                        text="Faltas"
                        toggleSidebar={toggleSidebar}
                    />
                </li>
            </ul>
        </nav>
    );
}

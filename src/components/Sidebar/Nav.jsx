import { NavLink } from "react-router-dom";
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
            <div className="px-4">
                <div className="border-t-gray-300 border-t"></div>
            </div>
            <ul>
                <li className="my-1">
                    <NavLinkClient
                        target="/notifications"
                        icon="bxr bxs-bell"
                        text="Notificaciones"
                        toggleSidebar={toggleSidebar}
                    />
                </li>
                <li className="mb-1">
                    <NavLinkClient
                        target="/settings"
                        icon="bxr bxs-cog"
                        text="Configuración"
                        toggleSidebar={toggleSidebar}
                    />
                </li>
            </ul>
        </nav>
    );
}

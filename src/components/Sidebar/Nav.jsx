import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="py-4">
            <ul>
                <li className="mb-1">
                    <NavLink
                        to="/"
                        href="#"
                        className={({ isActive }) =>
                            `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                                isActive
                                    ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                                    : ""
                            }`
                        }
                    >
                        <i className="bxr bxs-home-alt bx-rotate-180 bx-flip-horizontal text-xl mr-3"></i>
                        <span>Inicio</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink
                        to="/materias"
                        className={({ isActive }) =>
                            `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                                isActive
                                    ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                                    : ""
                            }`
                        }
                    >
                        <i className="bxr bxs-book mr-3 text-xl"></i>
                        <span>Materias</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink
                        to="/horario"
                        className={({ isActive }) =>
                            `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                                isActive
                                    ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                                    : ""
                            }`
                        }
                    >
                        <i className="bxr bxs-calendar-alt mr-3 text-xl"></i>
                        <span>Horario</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink
                        to="/tareas"
                        href="#"
                        className={({ isActive }) =>
                            `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                                isActive
                                    ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                                    : ""
                            }`
                        }
                    >
                        <i className="bxr bxs-checklist mr-3 text-xl"></i>
                        <span>Tareas</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink
                        to="faltas"
                        className={({ isActive }) =>
                            `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                                isActive
                                    ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                                    : ""
                            }`
                        }
                    >
                        <i className="bxr bx-chart-bar-rows mr-3 text-xl"></i>
                        <span>Faltas</span>
                    </NavLink>
                </li>
            </ul>
            <div className="px-4">
                <div className="border-t-gray-300 border-t"></div>
            </div>
            <ul>
                <li className="my-1">
                    <NavLink
                        to="notificaciones"
                        className={({ isActive }) =>
                            `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                                isActive
                                    ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                                    : ""
                            }`
                        }
                    >
                        <i className="bxr  bxs-bell mr-3 text-xl"></i>
                        <span>Notificaciones</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink
                        to="configuracion"
                        className={({ isActive }) =>
                            `flex px-4 py-3 font-poppins items-center text-gray-600 rounded-lg hover:bg-gray-100 ${
                                isActive
                                    ? "bg-logo/10 text-logo rounded-l-lg hover:bg-logo/10"
                                    : ""
                            }`
                        }
                    >
                        <i className="bxr  bxs-cog mr-3 text-xl"></i>
                        <span>Configuración</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

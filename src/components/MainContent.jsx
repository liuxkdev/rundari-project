import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Schedule from "./pages/Schedule";
import Tasks from "./pages/Tasks";
import Absences from "./pages/Absences";
import Notifications from "./pages/Notifications";
import Config from "./pages/Config";

export default function MainContent({ toggleSidebar }) {
    return (
        <main className="grid grid-rows-[auto_1fr]">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Header title="Inicio" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/materias"
                    element={
                        <Header
                            title="Materias"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                ></Route>
                <Route
                    path="/horario"
                    element={
                        <Header title="Horario" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/tareas"
                    element={
                        <Header title="Tareas" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/faltas"
                    element={
                        <Header title="Faltas" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/notificaciones"
                    element={
                        <Header
                            title="Notificaciones"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                ></Route>
                <Route
                    path="/configuracion"
                    element={
                        <Header
                            title="Configuración"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                ></Route>
            </Routes>
            <section className="rounded-t-xl inset-shadow-[0.25rem_0.25rem_0.5rem_#22222211] p-4 overflow-auto">
                <div>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/materias" element={<Subjects />}></Route>
                        <Route path="/horario" element={<Schedule />}></Route>
                        <Route path="/tareas" element={<Tasks />}></Route>
                        <Route path="/faltas" element={<Absences />}></Route>
                        <Route
                            path="/notificaciones"
                            element={<Notifications />}
                        ></Route>
                        <Route
                            path="/configuracion"
                            element={<Config />}
                        ></Route>
                    </Routes>
                </div>
            </section>
        </main>
    );
}

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
        <main className="grid grid-rows-[auto_1fr] min-h-[100svh]">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Header title="Inicio" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/schedule"
                    element={
                        <Header title="Horario" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/subjects"
                    element={
                        <Header
                            title="Asignaturas"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                ></Route>
                <Route
                    path="/tasks"
                    element={
                        <Header title="Tareas" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/absences"
                    element={
                        <Header title="Faltas" toggleSidebar={toggleSidebar} />
                    }
                ></Route>
                <Route
                    path="/notifications"
                    element={
                        <Header
                            title="Notificaciones"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                ></Route>
                <Route
                    path="/settings"
                    element={
                        <Header
                            title="Configuración"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                ></Route>
            </Routes>
            <section className="rounded-t-xl sm:inset-shadow-[0.25rem_0.25rem_0.5rem_#22222211] overflow-auto p-6 bg-gray-100">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/schedule" element={<Schedule />}></Route>
                        <Route path="/subjects" element={<Subjects />}></Route>
                        <Route path="/tasks" element={<Tasks />}></Route>
                        <Route path="/absences" element={<Absences />}></Route>
                        <Route
                            path="/notifications"
                            element={<Notifications />}
                        ></Route>
                        <Route
                            path="/settings"
                            element={<Config />}
                        ></Route>
                    </Routes>
            </section>
        </main>
    );
}

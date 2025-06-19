import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Schedule from "./pages/Schedule";
import Tasks from "./pages/Tasks";
import Absences from "./pages/Absences";
import Notifications from "./pages/Notifications";
import Config from "./pages/Config";

export default function MainContent({ toggleSidebar, tasks, setTasks }) {
    return (
        <main className="grid grid-rows-[auto_1fr] h-[100dvh]">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Header title="Inicio" toggleSidebar={toggleSidebar} />
                    }
                />
                <Route
                    path="/schedule"
                    element={
                        <Header title="Horario" toggleSidebar={toggleSidebar} />
                    }
                />
                <Route
                    path="/subjects"
                    element={
                        <Header
                            title="Asignaturas"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <Header title="Tareas" toggleSidebar={toggleSidebar} />
                    }
                />
                <Route
                    path="/absences"
                    element={
                        <Header title="Faltas" toggleSidebar={toggleSidebar} />
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <Header
                            title="Notificaciones"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <Header
                            title="Configuración"
                            toggleSidebar={toggleSidebar}
                        />
                    }
                />
            </Routes>

            <section className="rounded-t-xl sm:inset-shadow-[0.25rem_0.25rem_0.5rem_#22222211] overflow-auto bg-gray-100">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route
                        path="/tasks"
                        element={<Tasks tasks={tasks} setTasks={setTasks} />}
                    />
                    <Route path="/absences" element={<Absences />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/settings" element={<Config />} />
                </Routes>
            </section>
        </main>
    );
}

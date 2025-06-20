import { useState } from "react";
import AddBtn from "../AddBtn";
import TaskFormModal from "./modals/TaskFormModal";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "../Cards/TaskCard";
import PageNull from "../PageNull";

export default function Tasks({ tasks, setTasks }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    console.log("Modal abierto:", isFormOpen);
    const [category, setCategory] = useState("Todas");

    const toggleComplete = (id) => {
        const updated = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updated));
        setTasks(updated);
    };

    const deleteTask = (id) => {
        const updated = tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updated));
        setTasks(updated);
    };

    const filteredTasks = tasks
        .filter((task) => {
            const now = new Date();
            const deadline = new Date(task.deadline);
            if (category === "Atrasadas")
                return !task.completed && deadline < now;
            if (category === "Pendientes")
                return !task.completed && deadline >= now;
            if (category === "Completadas") return task.completed;
            return true; // "Todas"
        })
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return (
        <>
            <nav className="w-full flex justify-center mt-4">
                <ul className="flex overflow-x-auto gap-4 px-4">
                    {["Todas", "Atrasadas", "Pendientes", "Completadas"].map(
                        (cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium font-poppins transition-colors ${
                                    category === cat
                                        ? "bg-logo text-white"
                                        : "bg-gray-200 text-gray-700  cursor-pointer"
                                }`}
                            >
                                {cat}
                            </button>
                        )
                    )}
                </ul>
            </nav>

            <AddBtn toggleFormOpen={() => setIsFormOpen(true)} />

            {filteredTasks.length === 0 ? (
                <div className="h-[calc(100%-52px)]">
                    <PageNull
                        title={`Sin tareas ${
                            category === "Todas" ? "" : category.toLowerCase()
                        }`}
                        text={"Aquí aparecerá un registro de tus tareas"}
                    />
                </div>
            ) : (
                <div
                    className="p-6 grid gap-4
                        lg:grid-cols-2 xl:grid-cols-3"
                >
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={toggleComplete}
                            onDelete={deleteTask}
                        />
                    ))}
                </div>
            )}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
                        onClick={() => setIsFormOpen(false)}
                    />
                )}
            </AnimatePresence>
            <TaskFormModal
                isFormOpen={isFormOpen}
                toggleFormOpen={() => setIsFormOpen(false)}
                tasks={tasks}
                setTasks={setTasks}
            />
        </>
    );
}

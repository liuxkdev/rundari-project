import { useState } from "react";
import AddBtn from "../AddBtn";
import TaskFormModal from "./modals/TasksFormModal";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "../Cards/TaskCard";
import PageNull from "../PageNull";

export default function Tasks({ tasks, setTasks }) {
    const [isFormOpen, setIsFormOpen] = useState(false);

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

    return (
        <div
            className={`p-6 grid gap-4   ${
                tasks.length > 0 ? "lg:grid-cols-2 xl:grid-cols-3" : "h-full"
            }`}
        >
            <AddBtn toggleFormOpen={() => setIsFormOpen(true)} />

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

            {tasks.length === 0 ? (
                <PageNull
                    title={"Sin tareas pendientes"}
                    text={"Aquí aparecerá un registro de tus tareas"}
                />
            ) : (
                tasks
                    .slice() // clonar para no mutar
                    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                    .map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={toggleComplete}
                            onDelete={deleteTask}
                        />
                    ))
            )}
        </div>
    );
}

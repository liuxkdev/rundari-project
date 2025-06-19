import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(stored);
    }, []);

    return (
        <Router>
            <div className="grid h-[100svh] sm:grid-cols-[240px_1fr]">
                <Sidebar
                    isOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    tasks={tasks}
                />

                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black backdrop-blur-sm z-30 sm:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}
                </AnimatePresence>

                <MainContent
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    setTasks={setTasks}
                    tasks={tasks}
                />
            </div>
        </Router>
    );
}

export default App;

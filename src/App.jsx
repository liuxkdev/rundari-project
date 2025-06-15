import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router} from "react-router-dom";
import { useState } from "react";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <Router>
            <div className="grid h-[100dvh] sm:grid-cols-[240px_1fr]">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
                <MainContent toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            </div>
        </Router>
    );
}
export default App;

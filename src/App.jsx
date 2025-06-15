import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="grid min-h-[100svh] grid-cols-[240px_1fr]">
                <Sidebar />
                <MainContent />
            </div>
        </Router>
    );
}
export default App;

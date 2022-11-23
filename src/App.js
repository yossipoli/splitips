import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Splitter from "./Components/Splitter";
import Logo from "./Components/Logo/Logo";
import Login from "./Components/Form/Login";
import Register from "./Components/Form/Register";

function App() {
    return (
        <div className="App">
            <Router>
                <Logo />
                <Routes>
                    <Route path="/all" element={
                        <div>
                            <Login />
                            <Register /> 
                            <Splitter />
                        </div>
                    }/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Splitter />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

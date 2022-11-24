import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Splitter from "./Components/Splitter";
import Logo from "./Components/Logo/Logo";
import Login from "./Components/Form/Login";
import Register from "./Components/Form/Register";
import Forgot from "./Components/Form/ForgotPassword";
import ResetPassword from "./Components/Form/ResetPassword";

function App() {
    return (
        <div className="App">
            <Router>
                <Logo />
                <Routes>
                    <Route path="/all" element={
                        <div>
                            <Register /> 
                            <Login />
                            <Forgot/>
                            <ResetPassword/>
                            <Splitter />
                        </div>
                    }/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<Forgot />} />
                    <Route path="reset-password/:id" element={<ResetPassword />} />
                    <Route path="/" element={<Splitter />} />
                    <Route path="*" element={<Splitter />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

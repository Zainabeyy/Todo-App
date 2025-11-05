import Home from "./pages/home";
import { TodoProvider } from "./hook/useTodoList";
import { ThemeProvider } from "./hook/useTheme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <TodoProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </TodoProvider>
      </ThemeProvider>
    </Router>
  );
}

import Home from "./pages/home";
import { TodoProvider } from "./hook/useTodoList";
import { ThemeProvider } from "./hook/useTheme";

export default function App() {

  return (
    <ThemeProvider>
      <TodoProvider>
        <Home />
      </TodoProvider>
    </ThemeProvider>
  );
}

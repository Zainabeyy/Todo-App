import React from "react";
import Home from "./pages/home";

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  // toggling the dark mode in localStorage and in file 

  React.useEffect(() => {
    const localDarkMode = localStorage.getItem("darkMode");
    if (localDarkMode !== null) {
      setDarkMode(JSON.parse(localDarkMode));
    }
  }, []);
  async function toggleDarkMode() {
    setDarkMode((prev) => {
      const newDarkMode=!prev;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      return newDarkMode
    });
  }

  // setting the dark theme

  React.useEffect(() => {
    if (!darkMode) {
      document.documentElement.setAttribute("class", "light");
    } else {
      document.documentElement.setAttribute("class", "dark");
    }
  }, [darkMode]);
  return <Home toggleTheme={toggleDarkMode} darkmode={darkMode} />;
}
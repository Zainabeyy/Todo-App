import { useTheme } from "../hook/useTheme";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div>
      <div className="backgroundImg"></div>
      <div className="relative z-5 backdrop-blur-sm bg-white-100/40 p-3 px-5 rounded-2xl flex items-center justify-between max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-4xl uppercase font-semibold text-slate-700 dark:text-white-000 md:text-6xl"
        >
          todo
        </Link>
        <div className="flex gap-3">
          <Link
            to="/signup"
            className="text-lg sm:text-xl text-green-dark dark:text-white-100"
          >
            Signin
          </Link>
          <label htmlFor="darkMode" className="cursor-pointer">
            <input
              className="hidden"
              type="checkbox"
              id="darkMode"
              name="darkMode"
              onChange={toggleDarkMode}
              checked={darkMode}
            />
            <img
              src={darkMode ? "icon-sun.svg" : "icon-moon.svg"}
              className="w-auto h-auto"
              alt="toggle Theme button"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

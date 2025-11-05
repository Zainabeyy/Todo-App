import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Login Data:", formData);
    // 🔐 Add Firebase login logic here later
  }

  return (
    <div className="px-6 py-16 m-auto flex justify-center items-center flex-col">
      <div className="backgroundImg -z-5"></div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-green-light rounded-md p-6 space-y-4 backdrop-blur bg-white/20 equalShadow"
      >
        <h1 className="text-4xl uppercase font-semibold text-slate-700 dark:text-white-000 text-center">
          signup
        </h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md focus:outline-none caret-emerald-700 dark:caret-emerald-950 dark:bg-green-light borderCont"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md focus:outline-none caret-emerald-700 dark:caret-emerald-950 dark:bg-green-light borderCont"
        />

        <button
          type="submit"
          className="w-full py-3 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-white-000">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-emerald-700 dark:text-emerald-950 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

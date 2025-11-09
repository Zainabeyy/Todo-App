import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate= useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        console.log(error);
        throw new Error(data.error || "Registration failed");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="py-10 lg:py-16 m-auto flex justify-center items-center flex-col">
      <div className="backgroundImg "></div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 space-y-5 max-w-xl backdrop-blur bg-white/20 equalShadow"
      >
        <h1 className="text-4xl uppercase font-semibold text-slate-700 dark:text-white text-center">
          signup
        </h1>
        <input
          type="text"
          name="name"
          placeholder="full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="formInput"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="formInput"
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="formInput"
          title="Username must be 1–20 characters and can only include letters, numbers, underscores (_), or hyphens (-)."
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="formInput"
        />

        <button
          type="submit"
          className="authBtn"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-white">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-700 dark:text-yellow-200 font-semibold"
          >
            Log In
          </Link>
        </p>
      </form>
      <p className="text-center text-red-500 mt-10">{error}</p>
    </div>
  );
}

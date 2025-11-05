import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    }catch(err){
      console.error(err);
    }
    console.log("Signup Data:", formData);
  }

  return (
    <div className="px-6 py-16 m-auto flex justify-center items-center flex-col">
        <div className="backgroundImg "></div>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-green-light rounded-md p-6 space-y-5 max-w-xl backdrop-blur bg-white/20 equalShadow"
      >
        <h1 className="text-4xl uppercase font-semibold text-slate-700 dark:text-white-000 text-center">
          signup
        </h1>
        <input
          type="text"
          name="name"
          placeholder="full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md focus:outline-none caret-emerald-700 dark:caret-emerald-950 dark:bg-green-light borderCont"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md focus:outline-none caret-emerald-700 dark:caret-emerald-950 dark:bg-green-light borderCont"
        />
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
          className="w-full py-3 mt-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-white-000">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-700 dark:text-emerald-950 font-semibold"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

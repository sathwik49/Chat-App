import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

export default function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    gender: "",
  });
  const { loading, signup, message, success, setSuccess } = useSignup();

  const handleCheckbox = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div>
      {/* {success !== null && (
        <div
          className={`mt-4 p-4 text-sm flex justify-between cursor-pointer ${
            success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          } rounded-md`}
        >
          {message}
          <span onClick={() => setSuccess(null)}>X</span>
        </div>
      )} */}

      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-sm p-8 mx-auto my-10 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Sign Up
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <span className="block text-gray-700 mb-2">Gender</span>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={inputs.gender === "male"}
              onChange={() => handleCheckbox("male")}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Male</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={inputs.gender === "female"}
              onChange={() => handleCheckbox("female")}
              className="form-checkbox text-pink-600"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

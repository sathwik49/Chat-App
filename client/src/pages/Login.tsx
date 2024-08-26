import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
    const [ inputs,setInputs ] = useState({
        username:"",
        password:""
    })
    
    const { login,loading,message,success,setSuccess } = useLogin();

    const handleLoginForm = async (e:React.FormEvent)=>{
        e.preventDefault();
        await login(inputs)
    }
  return (
    <>
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
       onSubmit={handleLoginForm}
      className="w-full max-w-sm p-8 mx-auto my-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Login
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            value={inputs.username}
            onChange={(e)=>setInputs({...inputs,username:e.target.value})}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            value={inputs.password}
            onChange={(e)=>setInputs({...inputs,password:e.target.value})}
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
}

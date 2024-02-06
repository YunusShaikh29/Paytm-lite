import React from 'react'
import { Link, Form } from 'react-router-dom'

function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="max-w-[20rem] mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-3xl font-[750] mb-4 text-center">Sign In</h2>
      <p className="text-gray-600 mb-6 text-center">
        Enter your credentials to access your account.
      </p>
      <Form className="space-y-4" method='post'>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            placeholder="johndoe@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-2 rounded-md hover:bg-gray-900"
          >
            Sign In
          </button>
        </div>
        <div className="text-[.9rem] text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sing Up
          </Link>
        </div>
      </Form>
    </div>
  </div>
  )
}

export default SignIn
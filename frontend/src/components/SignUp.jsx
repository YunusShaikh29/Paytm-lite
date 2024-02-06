import React from "react";
import { Form, Link, useActionData, useNavigation, } from "react-router-dom";
import signupAction from "../pages/SignupPage";
// import signupAction from "../pages/SignupPage"

function SignUp() {


  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-[20rem] mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-[750] mb-4 text-center">Sign Up</h2>
          <p className="text-gray-600 mb-6 text-center">
            Enter your information to create an account.
          </p>
          <Form className="space-y-4" method="post">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-gray-400"
                placeholder="John"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-gray-400"
                placeholder="Doe"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="username"
                name="username"
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
                required
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <button
              type="submit"
                className="w-full bg-black text-white py-2 px-2 rounded-md hover:bg-gray-900 font-[600]" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting...": "Sign Up"}
              </button>
            </div>
            <div className="text-[.9rem] text-center">
              Already have an account?{" "}
              <Link  to="/" className="underline">
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignUp;

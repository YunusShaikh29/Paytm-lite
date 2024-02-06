import React from "react";
// import SignUp from '../components/SignUp'
import { json } from "react-router-dom";
import { redirect } from "react-router-dom";

// export function SignupPage() {
//   return (
//     <SignUp />
//   )
// }

const action = async ({ request }) => {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
  };

  console.log(JSON.stringify(authData))

  const response = await fetch("http://localhost:7070/api/v1/user/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 411 || response.status === 401) {
    throw response;
  }

  if (!response.ok) {
    throw json({
      message: "Signup failed! Please try again later",
    });
  }
  return redirect("/");
};

export default action;

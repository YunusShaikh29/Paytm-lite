import React from 'react'
import SignIn from '../components/SignIn'
import { redirect } from 'react-router-dom'

function SigninPage() {
  return (
    <SignIn />
  )
}

export default SigninPage

// eslint-disable-next-line react-refresh/only-export-components
export const action = async({request}) => {
    const data = await request.formData()

    const authData = {
        username: data.get("email"),
        password: data.get("password")
    }

    const response = await fetch("http://localhost:7070/api/v1/user/signin", {
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

  const resData = await response.json()
  const token = resData.token

  localStorage.setItem("token", token)

  return redirect("/dashboard")
}
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate= useNavigate();

  const goBack= () => {
    navigate('/dashboard')
  }

  const logOut= () => {
    localStorage.clear();
    navigate('/')
  }
  
  


  const updateUser = async (e) => {

    e.preventDefault();

    const form = e.target;
    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      password: form.password.value
    };

    
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      alert("Please fill at least one field.");
      return;
    }
  
   
    const token = localStorage.getItem("Token");

    // const api = 

    try {
      const response = await axios.put("http://localhost:3000/api/v1/user/", filteredData,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      form.reset();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again.");
    }
  };



  const inputClass =
    "w-full py-1.5 px-2 rounded outline-none text-lg text-slate-800 focus:outline-teal-600 -outline-offset-2";
  const btnClass =
    "mt-4 bg-slate-100 font-bold w-full text-black rounded-md py-2 transition-all transform hover:bg-teal-500 active:translate-y-0.5 shadow-none";

  

  return (
    <div className="relative h-screen px-4 w-4/5 mx-auto">
      <div className="flex justify-between items-center h-full">
        <div className="updateInfo h-2/3 bg-black w-1/3 border-white shadow-lg shadow-stone-900 rounded-lg flex flex-col justify-center">
          <h1
            align="center"
            className="font-semibold text-4xl"
          >
            Update info
          </h1>
          <p className="my-9 place-self-center text-xl text-stone-400">
            Enter any info you want to change
          </p>
          <form onSubmit={updateUser} className="flex flex-col w-3/4 mx-auto gap-4 text-lg">
            <label
              htmlFor="firstname"
              className="text-lg"
            >
              First Name:{" "}
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              name="firstName"
            />
            <label
              htmlFor="lastname"
              className="text-lg"
            >
              Last Name:{" "}
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              name="lastName"
            />
            <label
              htmlFor="password"
              className="text-lg"
            >
              Password:{" "}
            </label>
            <input
              className={`${inputClass}`}
              type="password"
              name="password"
            />
            <button
              className={`${btnClass}`}
              type="submit"
            >
              Change info
            </button>
          </form>
        </div>
        <div className="logout flex justify-center gap-24">
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2  rounded-md text-2xl px-2 shadow-md shadow-black" onClick={goBack}>
            Go Back 🏃‍♂️
          </button>
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 rounded-md text-2xl px-2 shadow-md shadow-black" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-1/2 bg-white w-0.5"></div>
    </div>
  );
};

export default UserInfo;
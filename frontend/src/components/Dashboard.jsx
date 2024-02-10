import React, { useEffect, useState } from "react";
import UserIcon from "./User/UserIcon";
// import User from "./User/User";
import UserList from "./User/UserList";
import { getAuthToken } from "../util/Auth";
import useDebounce from "../Hooks/Debounce";
import { Form } from "react-router-dom";
import axios from "axios";
import User from "./User/User";
// import e from "express";

// const token = getAuthToken();

function Dashboard({ users, user, balance }) {
  const [usersArr, setUsersArr] = useState([]);
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 500);

  const combinedName = `${user.firstName
    .charAt(0)
    .toUpperCase()}${user.firstName.slice(1)} ${user.lastName
    .charAt(0)
    .toUpperCase()}${user.lastName.slice(1)}`;

    const api = import.meta.env.VITE_BASEURL

  useEffect(() => {
    axios
      .get(`${api}api/v1/user/bulk?filter=${debouncedFilter}`)
      .then((response) => {
        if (filter.length === 0) {
          setUsersArr(users);
        } else {
          setUsersArr(response.data.user);
        }
      });
  }, [filter, debouncedFilter, users, api]);


  return (
    <div className="container">
      <div className="w-full px-8 py-4">
        <div className="w-full flex justify-between mb-6">
          <h1 className="text-white text-4xl font-[700]">Payment App</h1>
          <div className="text-white text-2xl font-[400] flex justify-between gap-4 items-center">
            Hello, {combinedName} <UserIcon user={combinedName} />
          </div>
        </div>
        <p className="border-b-2 border-slate-800"></p>
        <div className="w-full my-8 text-white text-2xl font-[580]">
          <h4>Your Balance : ₹{balance}</h4>
        </div>
        <h4 className="w-full my-6 text-white text-2xl font-[600]">Users</h4>

        <input
          type="text"
          name="filter"
          id="filter"
          className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-gray-400 bg-zinc-900 text-white"
          placeholder="Search Users..."
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="my-8">
          {/* <UserList users={usersArr} /> */}
          {usersArr.map((user) => <User user={user} userId={user._id}/>)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

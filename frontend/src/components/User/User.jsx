import React, { useState } from "react";
import UserIcon from "./UserIcon";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import TransferModal from "../TransferModal";

function User({ user, userId }) {
  const combinedName = `${user.firstName
    .charAt(0)
    .toUpperCase()}${user.firstName.slice(1)} ${user.lastName
    .charAt(0)
    .toUpperCase()}${user.lastName.slice(1)}`;

  // const [sendMoney, setSendMoney] = useState(false);
  const navigate = useNavigate();

  const id = userId;

  const handleOnClick = () => {
   navigate(`/transfer?id=${id || user.id}&name=${combinedName}`)
  };

  
  return (
    <>
      
      <div className="w-full flex justify-between">
        <div className="flex gap-6 mb-6">
          <UserIcon user={combinedName} />
          <h4 className=" text-white text-2xl font-[400]">{combinedName}</h4>
        </div>

        <div>
          <button
            className="bg-black text-white py-2 px-2 rounded-md hover:bg-zinc-900 w-[8rem]"
            onClick={handleOnClick}
          >
            Send Money
          </button>
        </div>
      </div>
      <p className="border-b-2 border-slate-800 mb-4"></p>
    </>
  );
}

export default User;

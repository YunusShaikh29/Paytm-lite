import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  Form,
  Link,
  useNavigate,
  redirect,
  json
} from "react-router-dom";
import UserIcon from "./User/UserIcon";
import axios from "axios";
import { getAuthToken } from "../util/Auth";

function TransferModal() {
  const [searchParams] = useSearchParams();
  const fullName = searchParams.get("name");

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[25rem] mx-auto bg-zinc-700 p-8 rounded-md shadow-md text-gray-300">
          <h2 className="text-3xl font-[750] text-center mb-12">Send Money</h2>

          <div className="flex items-center gap-4">
            <UserIcon user={fullName} color={"green-500"} />
            <h3 className="text-2xl font-bold">{fullName}</h3>
          </div>
          <p className="font-[500]">Amount (in Rs)</p>
          <Form method="post">
            <div className="w-full flex flex-col gap-4">
              <input
              
                id="amount"
                name="amount"
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-gray-400 bg-zinc-900 text-white"
                placeholder="Enter amount"
               
              />
              <button
                className="w-full bg-green-500 text-black py-2 px-2 rounded-md hover:bg-green-600 font-[600]"
              >
                Initiate Transfer
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default TransferModal;

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const token = getAuthToken();

  const params = new URL(request.url).searchParams;
  const id = params.get("id");

  const data = await request.formData();
  console.log(id);

  const amount = data.get("amount");

  const api = import.meta.env.VITE_BASEURL

  const response = await axios.post(
    api + "api/v1/account/transfer",
    { to: id, amount: amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );


  if (response.status === 400) {
    return response;
  }

//   if (!response.ok) {
//     throw json({ message: "Could not authenticate user" }, { status: 500 });
//   }

  return redirect("/dashboard");
};

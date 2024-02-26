import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/Auth";
// import { response } from "express";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
  const { data } = useLoaderData();

  // const {users, user, balance} = data

  return (
    <Suspense fallback={<p style={{textAlign: "center", color: "white", fontSize: "1rem"}}>Loading🔃...</p>}>
      <Await resolve={data} >
        {(data) => (
          <Dashboard
            users={data.users}
            user={data.user}
            balance={data.balance}
          />
        )}
      </Await>
    </Suspense>
  );
}

export default DashboardPage;

// eslint-disable-next-line react-refresh/only-export-components
export const loadData = async () => {
  const token = getAuthToken();

  // api/v1/user/bulk
  const api = import.meta.env.VITE_BASEURL
  console.log(api)

  const response = await fetch(api + "api/v1/user/all_users", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  // window.location.reload()
  return data;
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  return defer({
    data: loadData(),
  });
};



// export const action = async({request}) => {
//   const data = await request.formData()


// }
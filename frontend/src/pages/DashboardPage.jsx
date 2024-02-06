import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/Auth";
// import { response } from "express";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
  const { data } = useLoaderData();

  // const {users, user, balance} = data

  return (
    <Suspense>
      <Await resolve={data}>
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

  const response = await fetch("http://localhost:7070/api/v1/user/all_users", {
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
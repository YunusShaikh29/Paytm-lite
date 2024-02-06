import React from "react";
import User from "./User";

function UserList({ users = [] }) {
  return (
    <div className="mb-8">
      {users.map((user) => {
        // Combine first and last name with capitalized first letters
        const combinedName = `${user.firstName
          .charAt(0)
          .toUpperCase()}${user.firstName.slice(1)} ${user.lastName
          .charAt(0)
          .toUpperCase()}${user.lastName.slice(1)}`;

        return <User user={combinedName} key={user._id} userId={user._id} />;
      })}
    </div>
  );
}

export default UserList;

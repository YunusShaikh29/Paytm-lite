import React, { useState } from "react";

function UserIcon({ user}) {
  // const [userName, setUserName] = useState("")

  const userNameArr = user.split(" ");
  const userNameAlphabets = userNameArr.map((a) => a[0].toUpperCase()).join("");
  // setUserName(userNameAlphabets)

  return (
    <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-gray-200 text-[1.2rem] flex justify-center items-center font-[400] text-black">
      {userNameAlphabets}
    </div>
  );
}

export default UserIcon;

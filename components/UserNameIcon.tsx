import React from "react";

const UserNameIcon = ({ name }: { name: string }) => {
  return <div className="rounded-icon px-3 py-1 text-white">{name}</div>;
};

export default UserNameIcon;

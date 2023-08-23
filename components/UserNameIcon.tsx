import React from "react";

type UserNameIconProps = {
  name: string;
  className: string;
};

const UserNameIcon = ({ name, className }: UserNameIconProps) => {
  return (
    <div className={`rounded-icon-name ${className}`}>
      <span>{name}</span>
    </div>
  );
};

export default UserNameIcon;

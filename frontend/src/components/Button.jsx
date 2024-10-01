import React from "react";

const Button = ({ name, classname }) => {
  return (
    <div>
      <button className={`btn border-none w-max ${classname} `}>{name}</button>
    </div>
  );
};

export default Button;

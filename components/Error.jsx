import React from "react";

const Error = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl font-bold text-white">{error}</h1>
      </div>
    </div>
  );
};

export default Error;

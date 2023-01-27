import React from "react";

const Error = ({ error }) => {
  return (
    <div>
      <div>
        <h1>Please Fix This Error & Reload Browser</h1>
        {error}
      </div>
    </div>
  );
};

export default Error;

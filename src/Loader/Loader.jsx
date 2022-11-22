import React from "react";

// package
import Loader from "react-spinner-loader";

export const Loaders = ({
  loader
}) => {
  return (
    <div className="App">
      <Loader
        show={loader}
        type="body"
        stack="vertical"
        message="Loading...."
        backgroundColor="white"
      />
    </div>
  );
}

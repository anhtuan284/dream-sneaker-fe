import React from "react";

const NoPage = (props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h3 className="text-8xl font-bold text-red-600">404</h3>
        <h3 className="text-4xl text-gray-800 mt-4">Sorry we can not find any of your request</h3>
      </div>
    </>
  );
};

export default NoPage;

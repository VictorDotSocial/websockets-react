import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-6">
      {children}
    </div>
  );
};

export default Layout;

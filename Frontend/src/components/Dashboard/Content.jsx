import React, { ReactNode, useEffect, useState } from "react";

const Content = ({ children }) => {
  return (
    <div id="content" className="md:col-span-4 md:row-span-3">
      {children}
    </div>
  );
};

export default Content;

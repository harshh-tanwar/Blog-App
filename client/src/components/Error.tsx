import React from "react";
import { ErrorOutlineOutlined } from "@mui/icons-material";

const Error = (children: any) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      <ErrorOutlineOutlined />
      {children}
    </div>
  );
};

export default Error;

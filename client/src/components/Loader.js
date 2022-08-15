import React from "react";
import Loader from "react-js-loader";

export default function PageLoader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader
        type="hourglass"
        bgColor={"#9c1f62"}
        title={"Loading ..."}
        color={"#FFFFFF"}
        size={150}
      />
    </div>
  );
}

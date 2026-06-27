import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import PrimarySearchAppBar from "../Component/Tobbar";
import { useState } from "react";

export default function DashboardLayout() {
  const [mode, setMode] = useState("light");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F5F2",
      }}
    >
      <SideBar />

      <div
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
        }}
      >
        <PrimarySearchAppBar mode={mode} setMode={setMode} isDashboard={true} />

        <div
          style={{
            padding: "30px",
            marginTop: "80px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

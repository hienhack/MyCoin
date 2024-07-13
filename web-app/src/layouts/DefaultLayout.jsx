import { Outlet } from "react-router-dom";
import SideBar from "./components/Sidebar";

function DefaultLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="min-w-[280px] w-[280px]">
        <SideBar />
      </div>
      <div className="min-h-screen bg-slate-100 w-[calc(100vw-280px)]">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;

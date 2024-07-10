import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function HomeLayout() {
  return (
    <div>
      <div className="w-4/5 max-w-screen-lg mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;

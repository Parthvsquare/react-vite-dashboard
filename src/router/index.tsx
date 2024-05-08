import { Navigate, Route, Routes } from "react-router-dom";
// import Board from "@/pages/Board";
import HomeLayout from "@/layout/HomeLayout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";

const AppRouter = () => {
  return (
    <div className="h-screen">
      {/* <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} /> */}
      <header className="fixed h-auto w-full bg-gray-100 dark:bg-gray-800 dark:text-white">
        <div className="flex items-center justify-between px-10 py-3">
          <div className="flex gap-x-3">
            <div className="">
              <div className="">React Dashboard</div>
            </div>
          </div>
        </div>
      </header>
      {/* {isLoggedIn && <BreadCrumbs />} */}
      <Routes>
        <Route
          path="/"
          element={true ? <HomeLayout /> : <Navigate to="login" />}
        >
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={!true ? <Login /> : <Navigate to="/" />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Route>
        <Route
          path="/*"
          element={true ? <NotFound /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};
export default AppRouter;

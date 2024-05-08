import { Navigate, Route, Routes } from "react-router-dom";
// import Board from "@/pages/Board";
import HomeLayout from "@/layout/HomeLayout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import MiniDrawer from "@/components/AppDrawer";

const AppRouter = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={true ? <MiniDrawer /> : <Navigate to="login" />}
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

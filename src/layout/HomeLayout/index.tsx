import AppDrawer from "@/components/AppDrawer";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <AppDrawer>
      <Suspense fallback={<LoadingSkeleton />}>
        <Outlet />
      </Suspense>
    </AppDrawer>
  );
}

export default HomeLayout;

function LoadingSkeleton() {
  return (
    <div className="flex gap-y-3">
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </div>
  );
}

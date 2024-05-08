import { Skeleton } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="h-full overflow-x-auto bg-white pt-14 dark:bg-gray-900 dark:text-white">
      <Suspense fallback={<LoadingSkeleton />}>
        <Outlet />
      </Suspense>
    </div>
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

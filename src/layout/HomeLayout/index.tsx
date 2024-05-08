// import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="h-full overflow-x-auto bg-white pt-14 dark:bg-gray-900 dark:text-white">
      <Suspense fallback={<div />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeLayout;

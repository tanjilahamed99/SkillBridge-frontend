"use client";

import { useAppSelector } from "@/hooks/useDispatch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SuperAdminPrivateRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    switch (user.role) {
      case "instructor":
        router.push("/instructor");
        break;
      case "superAdmin":
        break;
      case "admin":
        router.push("/admin");
        break;
      case "student":
        router.push("/dashboard");
        break;
      default:
        router.push("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "superAdmin") {
    return null;
  }

  return <>{children}</>;
};

export default SuperAdminPrivateRoute;

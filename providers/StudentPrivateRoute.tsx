"use client";

import { useAppSelector } from "@/hooks/useDispatch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StudentPrivateRoute = ({
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
        router.push("/superAdmin");
        break;
      case "admin":
        router.push("/admin");
        break;
      case "student":
        break; // allow access
      default:
        router.push("/login");
    }
  }, [user, router]);

  // While redirecting or if unauthorized
  if (!user || user.role !== "student") {
    return null;
  }

  return <>{children}</>;
};

export default StudentPrivateRoute;
import { useAppSelector } from "@/hooks/useDispatch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const InstructorPrivateRoute = ({
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
        break;
      case "superAdmin":
        router.push("/super-admin");
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

  if (!user || user.role !== "student") {
    return null;
  }

  return <>{children}</>;
};

export default InstructorPrivateRoute;

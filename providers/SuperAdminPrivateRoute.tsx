import { useAppSelector } from "@/hooks/useDispatch";
import { useRouter } from "next/navigation";

const SuperAdminPrivateRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  // Not logged in
  if (!user) {
    return router.push("/login");
  }

  // Role-based redirect
  switch (user.role) {
    case "instructor":
      return router.push("/instructor");

    case "user":
      return router.push("/dashboard");

    case "superAdmin":
      return children;

    case "admin":
      return router.push("/admin");

    default:
      return router.push("/login");
  }
};

export default SuperAdminPrivateRoute;

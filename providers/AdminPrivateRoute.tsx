import { useAppSelector } from "@/hooks/useDispatch";
import { useRouter } from "next/navigation";

const AdminPrivateRoute = ({ children }: { children: React.ReactNode }) => {
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

    case "student":
      return router.push("/dashboard");

    case "superAdmin":
      return router.push("/superAdmin");

    case "admin":
      return children;

    default:
      return router.push("/login");
  }
};

export default AdminPrivateRoute;

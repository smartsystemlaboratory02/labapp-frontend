import { Navigate, Outlet } from "react-router";
import { useGetUserDataQuery } from "~/services/onboarding/queries";
import AuthenticatedLoading from "./Loading";

const AuthenticatedLayout = () => {
  const { data: user, isLoading } = useGetUserDataQuery();

  if (isLoading && !user) {
    return <AuthenticatedLoading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthenticatedLayout;

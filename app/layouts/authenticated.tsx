import React from "react";
import { Navigate, Outlet } from "react-router";
import { useGetUserDataQuery } from "~/services/onboarding/queries";

const AuthenticatedLayout = () => {
  const { data: user, isLoading } = useGetUserDataQuery();

  if (isLoading && !user) {
    return <div>Loading...</div>; // TODO: Create loading screen
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthenticatedLayout;

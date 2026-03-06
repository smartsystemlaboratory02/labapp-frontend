import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/onboarding.tsx", [
    index("./pages/onboarding/login.tsx"),
    route("signup", "./pages/onboarding/signup.tsx"),
    route("forgot-password", "./pages/onboarding/forgotPassword.tsx"),
    route("enter-otp", "./pages/onboarding/otp.tsx"),
    route("reset-password", "./pages/onboarding/resetPassword.tsx"),
  ]),

  route("home", "./layouts/main.tsx", [
    index("./pages/dashboard/dashboard.tsx"),
  ]),
] satisfies RouteConfig;

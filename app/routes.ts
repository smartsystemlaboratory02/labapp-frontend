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
  ]),
] satisfies RouteConfig;

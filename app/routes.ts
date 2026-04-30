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

  layout("./layouts/main.tsx", [
    layout("./layouts/authenticated.tsx", [
      route("dashboard", "./pages/dashboard/dashboard.tsx"),

      route("projects", "./pages/projects/projects.tsx"),
      route("projects/add", "./pages/projects/addProject.tsx"),
      route("projects/:id", "./pages/projects/projectDetails.tsx"),
      route("projects/:id/edit", "./pages/projects/editProject.tsx"),
      route("projects/:id/feedback", "./pages/projects/feedback.tsx"),
      route("projects/:id/announcements", "./pages/projects/announcements.tsx"),

      route("personnel", "./pages/personnel/personnel.tsx"),
      route("personnel/:id", "./pages/personnel/personnelDetails.tsx"),
    ]),
  ]),
] satisfies RouteConfig;

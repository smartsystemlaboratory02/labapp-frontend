import { Outlet } from "react-router";
import TextLogo from "~/components/ui/TextLogo";

const OnboardingLayout = () => {
  return (
    <div className=" h-screen flex w-full">
      <div className="w-1/2 hidden md:block relative bg-[url('/onboarding-image.jpg')] bg-cover bg-center">
        <div className="absolute top-4 left-4 z-30">
          <TextLogo />
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-black/40" />
      </div>

      <div className="relative w-full flex items-center justify-center bg-[#fafafa] dark:bg-[#050505] p-4 overflow-y-scroll flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;

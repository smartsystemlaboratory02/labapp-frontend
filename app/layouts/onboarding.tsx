import { Outlet } from "react-router";
import TextLogo from "~/components/ui/TextLogo";

const OnboardingLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="w-1/2 hidden mlg:block bg-[url('/onboarding-image.jpg')] bg-cover bg-center h-screen fixed z-50 top-0 left-0">
        <div className="absolute top-4 left-4 z-30">
          <TextLogo />
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-black/40" />
      </div>

      <div className="relative w-full mlg:w-1/2 flex items-center justify-center bg-[#fafafa] dark:bg-[#050505] mlg:p-4 overflow-y-scroll flex-1 ml-auto min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;

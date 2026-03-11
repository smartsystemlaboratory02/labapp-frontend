import { Link } from "react-router";

const HorizontalLogo = () => {
  return (
    <Link
      to="/home/dashboard"
      className="flex items-center gap-3 text-secondary ml-4"
    >
      <img
        src="/ssrl-logo.png"
        alt="SSRL Logo"
        className="p-2 bg-white rounded-md size-12"
      />
      <div className="flex flex-col leading-none">
        <span className="font-bold text-xl font-bruno tracking-widest leading-7">
          SSRL
        </span>
        <span className="text-xs uppercase font-bold font-bruno leading-none">
          Lab App
        </span>
      </div>
    </Link>
  );
};

export default HorizontalLogo;

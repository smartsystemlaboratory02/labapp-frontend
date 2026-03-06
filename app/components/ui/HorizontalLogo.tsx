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
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-bold text-xl tracking-tight">SSRL</span>
        <span className="text-[10px] uppercase font-bold tracking-widest">
          Lab App
        </span>
      </div>
    </Link>
  );
};

export default HorizontalLogo;

import Logo from "./Logo";

const TextLogo = () => {
  return (
    <div className="flex gap-2 items-center justify-center z-20">
      <img
        src="/ssrl-logo.png"
        alt="ssrl logo"
        className="w-12 h-12 rounded-md"
      />
      <h2 className="text-2xl font-bold text-secondary tracking-wide">SSRL</h2>
    </div>
  );
};

export default TextLogo;

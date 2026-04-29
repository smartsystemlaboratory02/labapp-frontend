import React from "react";

const ComingSoonMask = () => {
  return (
    <div className="absolute inset-0 z-100 flex items-center justify-center rounded-[inherit] bg-white/60 backdrop-blur-[2px]">
      <div className="px-4 py-2 rounded-full bg-black/80 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
        Coming Soon
      </div>
    </div>
  );
};

export default ComingSoonMask;

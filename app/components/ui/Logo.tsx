import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img src={"/ssrl-logo.png"} alt="SSRL Logo" className="w-24" />
    </motion.div>
  );
};

export default Logo;

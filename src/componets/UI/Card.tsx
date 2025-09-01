import { motion } from "framer-motion";

export default function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-white/70 dark:bg-gray-900/50 backdrop-blur border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md"
    >
      {children}
    </motion.div>
  );
}

import { motion } from "framer-motion"

export default function Loading(props){
    return (
            <motion.div
            animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
            }}
            className="m-auto mt-20 h-20 w-20 bg-white opacity-40 flex justify-center content-center">
                <p className="m-auto text-gray-600 font-mono font-bold">Loading</p>
            </motion.div>
    );
}
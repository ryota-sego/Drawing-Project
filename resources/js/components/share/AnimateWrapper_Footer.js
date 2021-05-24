import { motion } from "framer-motion"

import Footer from "./animated_components/Footer"

const AnimateWrapper_Footer = () => (
    <motion.div   
        animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
    >
        <Footer />
    </motion.div>
);

export default AnimateWrapper_Footer;
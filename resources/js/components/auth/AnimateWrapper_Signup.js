import { motion } from "framer-motion"

import Signup from "./animated_components/Signup"

const AnimateWrapper_Signup = (props) => (
        <motion.div   
            animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
            className="wrap-page-share w-full h-full"
        >
            <Signup guest={props.guest} setIsGuest={props.setIsGuest} setGuest={props.setGuest} user_data={props.user_data}/>
        </motion.div>
);

export default AnimateWrapper_Signup;
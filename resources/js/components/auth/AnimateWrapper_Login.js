import { motion } from "framer-motion"

import Login from "./animated_components/Login"

const AnimateWrapper_Login = (props) => (
        <motion.div   
            animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
            className="w-full h-full wrap-page-share"
        >
            <Login guest={props.guest} setIsGuest={props.setIsGuest} setGuest={props.setGuest} user_data={props.user_data}/>
        </motion.div>
);

export default AnimateWrapper_Login;
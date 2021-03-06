import { motion } from "framer-motion"
import { Route } from "react-router-dom";
import WrapUserPage from "./animated_components/WrapUserPage"

const AnimateWrapper_UserPage = (props) => (
    
    <motion.div   
        animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
        className="wrap-page-share h-full w-full"
    >
       <Route render={routeProps => <WrapUserPage  guest={props.guest} user_data={props.user_data} {...routeProps} />} />
    </motion.div>
);

export default AnimateWrapper_UserPage;

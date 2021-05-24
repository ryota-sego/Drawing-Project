import { motion } from "framer-motion"
import { Route } from "react-router-dom";
import Header from "./animated_components/Header"

const AnimateWrapper_Header = (props) => (
        <motion.div   
            animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
        >
            <Route render={routeProps => <Header guest={props.guest} setIsGuest={props.setIsGuest} setGuest={props.setGuest} user_data={props.user_data} loc={props.loc} {...routeProps} />} />
        </motion.div>
);

export default AnimateWrapper_Header;
import { motion } from "framer-motion"
import { Route } from "react-router-dom";
import WrapEditPage from "./animated_components/WrapEditPage"

const AnimateWrapper_EditPage = (props) => (
    
    <motion.div   
        animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
        className="wrap-page-share h-full w-full overflow-auto"
    >
       <Route render={routeProps => <WrapEditPage  guest={props.guest} user_data={props.user_data} {...routeProps} />} />
    </motion.div>
);

export default AnimateWrapper_EditPage;
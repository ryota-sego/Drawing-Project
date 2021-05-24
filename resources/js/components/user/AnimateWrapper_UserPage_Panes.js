import { motion } from "framer-motion"
import { Route } from "react-router-dom";
import UserCommentPane from "./animated_components/panes/UserCommentPane"
import UserDetailPane from "./animated_components/panes/UserDetailPane"
import UserDrawingPane from "./animated_components/panes/UserDrawingPane"
import UserFavoritePane from "./animated_components/panes/UserFavoritePane"


export const AnimateWrapper_UserDetailPane = (props) => (
    
    <motion.div   
        animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
        className="h-full w-ful"
    >
       <Route render={routeProps => <UserDetailPane guest={props.guest} user_data={props.user_data} user_id={props.user_id} login_user_id={props.login_user_id} userUnMount={props.userUnMount} {...routeProps} />} />
    </motion.div>
);


export const AnimateWrapper_UserCommentPane = (props) => (
    
    <motion.div   
        animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
        className="h-full w-full"
    >
       <Route render={routeProps => <UserCommentPane guest={props.guest} user_id={props.user_id} login_user_id={props.login_user_id} url={props.url} userUnMount={props.userUnMount} {...routeProps} />} />
    </motion.div>
);


export const AnimateWrapper_UserDrawingPane = (props) => (
    <motion.div   
        animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
        className="h-full w-full"
    >
       <Route render={routeProps => <UserDrawingPane guest={props.guest} user_id={props.user_id} login_user_id={props.login_user_id} url={props.url} userUnMount={props.userUnMount} {...routeProps} />} />
    </motion.div>
);


export const AnimateWrapper_UserFavoritePane = (props) => (
    
    <motion.div   
        animate={{opacity: 1}}
            initial={{opacity: 0.5}}
            exit={{opacity: 0.2}}
            transition={{duration: 0.5}}
        className="h-full w-full"
    >
       <Route render={routeProps => <UserFavoritePane guest={props.guest} user_id={props.user_id} login_user_id={props.login_user_id} url={props.url} userUnMount={props.userUnMount} {...routeProps} />} />
    </motion.div>
);
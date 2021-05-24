import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion"

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {

        };
        
    }
    
    componentDidMount(){
        
    }
    
    render(){
        console.log(this.props.location);
        const [_, pathname] = this.props.location.pathname.split("/");
        return(<div>
                <AnimatePresence exitBeforeEnter initial={false}>
                    <Switch location={this.props.location} key={pathname}>
                        <Route path="/home" component={AboutC} />
                        <Route path="/test" component={Home} />
                    </Switch>
                    <motion.div
                    className="dialog"
                    animate={{
                      y: 0,
                      opacity: 1
                    }}
                    initial={{
                      y: 50,
                      opacity: 0
                    }}
                    exit={{
                      y: 50,
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.2
                    }}>
                        <h1>This is Dialog</h1>
                    </motion.div>
                    
                </AnimatePresence>
                <p>hi guys</p>
            </div>
        );
    }
}


const Home = () => (
  <motion.div
    animate={{
      x: 0,
      opacity: 1
    }}
    initial={{
      x: 100,
      opacity: 0
    }}
    exit={{
      x: -100,
      opacity: 0
    }}
    transition={{
      duration: 0.2
    }}
  >
    <h1>Home</h1>
    <Link to="/home">Link to About</Link>
    <Link to="/?dialog">Open Dialog</Link>
  </motion.div>
);
const About = () => (
  <motion.div
    animate={{
      x: 0,
      opacity: 1
    }}
    initial={{
      x: 100,
      opacity: 0
    }}
    exit={{
      x: -100,
      opacity: 0
    }}
    transition={{
      duration: 0.2
    }}
  >
    <h1>About</h1>
    <p>framer-motion + react-router transition example</p>
    <Link to="/test">Link to home</Link>
  </motion.div>
);

class AboutC extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:0,
        };
        this.countpulus = this.countpulus.bind(this)
    }
    
    countpulus(){
        this.setState({count:this.state.count + 1});
    }
    
    componentDidMount(){
        
    }
    
    render(){
        const [_, pathname] = this.props.location.pathname.split("/");
        
        return(
    <div>
    <Switch location={this.props.location}>
                        <Route path="{`pathname`}/home" component={About} />
                        <Route path="{`pathname`}/test" component={Home} />
                    </Switch>
                    <Link to="/home">Link to Abouasdadat</Link>
    <Link to="/test">Open adada</Link>
    <button onClick={this.countpulus}>kaunnto</button>
    <p>{this.state.count}</p>
  <motion.div
    animate={{
      x: 0,
      opacity: 1
    }}
    initial={{
      x: 100,
      opacity: 0
    }}
    exit={{
      x: -100,
      opacity: 0
    }}
    transition={{
      duration: 1
    }}
  >
    <h1>About</h1>
    <p>framer-motion + react-router transition example</p>
    <Link to="/test">Link to home</Link>
    <p>{this.state.count}</p>
  </motion.div>
  </div>
);
    }
} 

class HomeC extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
        
    }
    
    componentDidMount(){
        
    }
    
    render(){
        return(
  <motion.div
    animate={{
      x: 0,
      opacity: 1
    }}
    initial={{
      x: 100,
      opacity: 0
    }}
    exit={{
      x: -100,
      opacity: 0
    }}
    transition={{
      duration: 1
    }}
  >
    <h1>Home</h1>
    <Link to="/home">Link to About</Link>
  </motion.div>
);
    }
} 

//<Route exact path="/home" render={(routeProps)=> <WrapDrawingPage guest={this.state.guest} user_data={this.state.user_data} {...routeProps} />} />
const RouterWrap = (props) => {
    return(
        <Router>
            <Route render={(routeProps)=> <App {...routeProps} />} />
        </Router>
    );
}



if (document.getElementById('app')) {
    ReactDOM.render(<RouterWrap />, document.getElementById('app'));
}
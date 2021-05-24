import {BrowserRouter as Router, Route} from "react-router-dom";
import ReactDOM from "react-dom";

import App from '../components/App'

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
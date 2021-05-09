import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  useParams,
  NavLink,
  Link,
  Redirect,
} from "react-router-dom";

export default function Loading(props){
    return (
        <p id="loading_anime" className="top-auto right-auto bottom-auto left-auto transform-gpu origin-center">Loading</p>
        );
}
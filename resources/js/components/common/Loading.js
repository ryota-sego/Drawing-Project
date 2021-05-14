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
        <p id="loading_anime" className="h-12 w-24 transform-gpu origin-center">Loading</p>
        );
}
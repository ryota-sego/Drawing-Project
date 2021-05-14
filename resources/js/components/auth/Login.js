import React from 'react';
import { Redirect } from "react-router-dom";

import { Api_Login } from '../api/Api';

export default class Login extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'password':'',
            'email':'',
        };
        this.tryLogin = this.tryLogin.bind(this);
    }
    
    tryLogin = async e => {
        e.preventDefault();
        await Api_Login(this.state.email, this.state.password, this.props.setIsGuest);
    };
    
    render(){
        const is_guest = this.props.isGuest;
        
        if(!is_guest){
            return(<Redirect push to="/home" />);
        }
        
        return (
        <div className="wrap-page-share w-full h-full">
          <div className="h-full w-full space-y-8 flex flex-col items-center justify-center bg-gray-50">
            <div className="">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
            </div>
            <form className="mt-8 space-y-6 w-1/3" onSubmit={this.tryLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={this.state.email}
                    onChange={e => this.setState({'email':e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={e => this.setState({'password':e.target.value})}
                  />
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
        )
    }
}
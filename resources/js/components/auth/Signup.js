import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Redirect } from "react-router-dom";
import { Api_Signup } from '../api/Api';

export default class Signup extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            'name':'',
            'password':'',
            'email':'',
        };
        this.trySignup = this.trySignup.bind(this);
    }
    
    trySignup = async e => {
        e.preventDefault();
        await Api_Signup(this.state.email, this.state.name, this.state.password, this.props.setIsGuest);
        console.log(this.props.isGuest);
        console.log(6);
    };
    
    render(){
        const is_guest = this.props.isGuest;
        
        if(!is_guest){
            return(<Redirect push to="/home" />);
        }
        
        return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to your account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={this.trySignup}>
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
                    onChange={e => this.setState({'email':e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    onChange={e => this.setState({'name':e.target.value})}
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        )
    }
    
}
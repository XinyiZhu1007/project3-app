import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

const navStyle= {
    "background-color": "#e3f2fd",
    "margin-bottom": "15px"
}

const unloggedinArray = [{ name: "Home", url: "/" },
{ name: "Search", url: "/Search" },
{ name: "Register", url: "/userRegister" },
 { name: "Log In", url: "/login" }];

const loggedinArray = [{ name: "Home", url: "/" },
 { name: "Search", url: "/Search" },
 { name: "Profile", url: "/Profile" },
 { name: "Your Dogs", url: "/your-dog-listing" }]; //need to change this to below

class Navbar extends Component {
	constructor(props) {
		super(props);
        this.logout = this.logout.bind(this);
        	
	}

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    

    render() {
        console.log('navbar render, props: ')
        console.log(this.props);
            return(
                <nav className="navbar navbar-expand-lg navbar-light" style={navStyle}>
                    <Link to ="/" className="navbar-brand">Dog Walk</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        
                            {(this.props.loggedIn === false) ? 
                                <ul className="navbar-nav mr-auto">
                                    {unloggedinArray.map(x => (
                                        <li className={window.location.pathname === x.name
                                            ? "nav-item nav-link active"
                                            : "nav-item nav-link"}><Link to ={x.url}>{x.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            
                            :   
                                <ul className="navbar-nav mr-auto"> 
                                {loggedinArray.map(x => (
                                    <li className={window.location.pathname === x.name
                                        ? "nav-item nav-link active"
                                        : "nav-item nav-link"}><Link to ={x.url}>{x.name}</Link>
                                    </li>
                                ))}
                                    {/* <li className={window.location.pathname === {"/"+{this.props.username}+"/dogs"}
                                        ? "nav-item nav-link active"
                                        : "nav-item nav-link"}><Link to ={x.url}>{x.name}</Link> 
                                    </li>*/}

                                    <li className= "nav-item nav-link">
                                        <Link to ="/user/logout" onClick={this.logout}>Log Out</Link>
                                    </li> 
                                </ul>
                            }
                    </div>
                </nav>
            )
    }
}

export default Navbar;
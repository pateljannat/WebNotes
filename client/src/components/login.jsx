//component for login form
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import '../styles/login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            'isLoggedIn': sessionStorage.getItem('isLoggedIn')
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //handles change on form input elements 
    handleChange({ target }) {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    }

    //handles submission of login form
    handleSubmit(e) {
        e.preventDefault();
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`${process.env.REACT_APP_AXIOS_URL}/api/accounts/login`, payload).then(data => {
            if (data.data.success === true) {
                const token = {
                    'token': data.data.token,
                    'email': data.data.email
                }
                sessionStorage.setItem('key', JSON.stringify(token));
                sessionStorage.setItem('isLoggedIn', true);
                this.setState({
                    isLoggedIn: true
                });
                this.props.stateChange({
                    isLoggedIn: true
                });
            }
        })
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect from="/login" to="/"></Redirect>
        }
        else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email Address"></input>
                        {/*  <span className="validation-error">{this.state.errors.email}</span> */}
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"></input>
                        {/* <span className="validation-error">{this.state.errors.password}</span> */}
                    </div>
                    <button className="btn btn-primary" type="submit">Log In</button>

                    <div className="switch-section-login">
                        <div>Dont have an account? </div>
                        <Link to="/register">Sign Up</Link>
                    </div>
                </form>
            );
        }

    }
}

export default Login;
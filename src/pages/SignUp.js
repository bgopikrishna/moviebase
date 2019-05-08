import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./authForm.scss";

export class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.props.signUp(this.state);
  };

  render() {
    const { email, password, firstName, lastName } = this.state;

    return (
      <div className="form-container">
        <form>
          <h5 className="form-title">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              placeholder="Enter Your First Name"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              placeholder="Enter Your Last Name"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="input-field">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        {/* <div className="form-error">
          <p>Login Failed</p>
        </div> */}
        <div className="form-footer">
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    );
  }
}

export default SignUp;

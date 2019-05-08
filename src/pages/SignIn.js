import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./authForm.scss";

export class SignIn extends Component {
  state = {
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
    // this.props.signIn(this.state);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="form-container">
        <form>
          <h5 className="form-title">Sign In</h5>
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
            <button type="submit">Sign In</button>
          </div>
        </form>
        {/* <div className="form-error">
          <p>Login Failed</p>
        </div> */}
        <div className="form-footer">
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Forgot Password ?</Link>
        </div>
      </div>
    );
  }
}

export default SignIn;

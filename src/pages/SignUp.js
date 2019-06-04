import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./authForm.scss";
import { connect } from "react-redux";
import { doSignUp } from "../store/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    signInIndiactor: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(() => ({ signInIndiactor: true }));

    this.props.signUp(this.state);

    this.setState(() => ({ signInIndiactor: false }));
  };

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      signInIndiactor
    } = this.state;
    const signUpButtonText = signInIndiactor ? "Signing Up ..." : "Sign Up";

    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
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
              pattern="[a-zA-Z\s]+"
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
              pattern="[a-zA-Z\s]+"
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
            <button type="submit">
              {signUpButtonText}{" "}
              {signInIndiactor && <FontAwesomeIcon icon={faCircleNotch} spin />}
            </button>
          </div>
        </form>
        {authError && (
          <div className="form-error">
            <p>{authError}</p>
          </div>
        )}
        <div className="form-footer">
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  return {
    ...props,
    authError: state.authState.authError,
    auth: state.firebase.auth
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(doSignUp(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

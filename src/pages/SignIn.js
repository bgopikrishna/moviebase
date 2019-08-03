import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./authForm.scss";
import { connect } from "react-redux";
import { doSignIn } from "../store/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export class SignIn extends Component {
  state = {
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
    setTimeout(() => {
      this.props.signIn(this.state);

      this.setState(() => ({ signInIndiactor: false }));
    }, 3000);
  };

  render() {
    const { email, password, signInIndiactor } = this.state;
    const { authError, auth } = this.props;
    const signInButtonText = signInIndiactor ? "Signing In " : "Sign In";

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
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
            <button type="submit">
              {signInButtonText}{" "}
              {signInIndiactor && <FontAwesomeIcon icon={faSpinner} spin />}
            </button>
          </div>
        </form>
        {authError && (
          <div className="form-error">
            <p>{authError}</p>
          </div>
        )}
        <div className="form-footer">
          <Link to="/signup">Sign Up</Link>
          <Link to="/forgotpassword">Forgot Password ?</Link>
        </div>
        <p style={{ fontWeight: "lighter", opacity: "0.6", fontSize: "12px" }}>
          *Just use a fake E-mail to signup
        </p>
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
    signIn: creds => dispatch(doSignIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

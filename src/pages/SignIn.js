import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./authForm.scss";
import { connect } from "react-redux";
import { doSignIn } from "../store/actions/authActions";

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
    this.props.signIn(this.state);
  };

  render() {
    const { email, password } = this.state;
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="form-container" >
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
            <button type="submit">Sign In</button>
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

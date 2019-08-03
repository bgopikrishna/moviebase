import "./authForm.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { doResetPassword } from "../store/actions/authActions";

export class ForgotPassPage extends Component {
  state = {
    email: "",
    emailSent: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.resetPassword(this.state.email);
    this.setState(() => ({ emailSent: true }));
  };

  render() {
    const { authError } = this.props;
    const emailSentText = this.state.emailSent ? (
      <p>After reseting password, Sign In again</p>
    ) : (
      <p>
        Give us your email, we'll send you a password reset email (If you're
        already a registered user)
      </p>
    );

    if (!this.state.emailSent) {
      return (
        <div className="form-container" style={{ textAlign: "center" }}>
          <form style={{ padding: "10px" }} onSubmit={this.handleSubmit}>
            {emailSentText}
            <div className="input-field" style={{ alignItems: "center" }}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="input-field">
              <button type="submit">Reset Password</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="form-container" style={{ textAlign: "center" }}>
          {emailSentText}
          <div className="input-field">
            <Link style={{ textDecoration: "underline" }} to="/signin">
              Sign In{" "}
            </Link>

            {authError && (
              <div className="form-error">
                <p>{authError}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
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
    resetPassword: emailId => dispatch(doResetPassword(emailId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassPage);

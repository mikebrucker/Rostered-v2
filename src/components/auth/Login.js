import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const creds = { email: this.state.email, password: this.state.password };
    this.props.firebase.login(creds);
    // this.props.history.push("/");
  };

  render() {
    const { auth, authError } = this.props;
    if (!auth.isEmpty) return <Redirect to="/" />;

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit} className="">
          <h5 className="">Login</h5>
          <div className="">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <button className="">Login</button>
            <div className="">
              {authError ? <p>{authError.message}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.firebase.authError
});

const mapDispatchToProps = dispatch => ({
  // LogIn: creds => dispatch(LogIn(creds))
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);

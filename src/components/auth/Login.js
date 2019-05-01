import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const creds = { email: this.state.email, password: this.state.password };
    this.setState({ email: "", password: "" });
    this.props.firebase.login(creds);
  };

  render() {
    const { unauthorized, loaded, authError } = this.props;
    if (loaded && !unauthorized) return <Redirect to="/" />;

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit} className="">
          <h5 className="">Login</h5>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
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

const mapStateToProps = ({ firebase: { auth, authError } }) => ({
  loaded: auth.isLoaded,
  unauthorized: auth.isEmpty,
  authError
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

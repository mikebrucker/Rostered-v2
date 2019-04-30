import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
// import { signUp } from "../../store/actions/authActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.passwordConfirm) {
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };
      const newProfile = {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      };
      this.setState(
        {
          email: "",
          password: "",
          passwordConfirm: "",
          firstName: "",
          lastName: "",
          errors: {}
        },
        () => {
          this.props.firebase.createUser(newUser, newProfile);
          this.props.history.push("/");
        }
      );
    } else {
      this.setState({ errors: { nomatch: "Passwords Do Not Match" } });
    }
  };

  render() {
    // const { auth, authError } = this.props;
    // if (auth.uid) return <Redirect to="/" />;

    const showError =
      this.state.errors && this.state.errors.nomatch ? (
        <span>{this.state.errors.nomatch}</span>
      ) : null;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="blue-grey lighten-4">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn yellow btn-grey-text z-depth-0">
              Sign Up
            </button>
            <div className="red-text center">
              {/* {authError ? <p>{authError}</p> : null}
              {showError} */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // auth: state.firebase.auth,
  // authError: state.auth.authError
});

const mapDispatchToProps = dispatch => ({
  // signUp: newUser => dispatch(signUp(newUser))
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignUp);

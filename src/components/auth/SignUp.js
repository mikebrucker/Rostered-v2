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
    number: "",
    position: "C",
    shoots: "Right",
    addToPlayerList: true
  };

  handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.setState({
      [e.target.name]: value
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
          number: "",
          position: "C",
          shoots: "Right",
          addToPlayerList: true
        },
        () => {
          this.props.firebase.createUser(newUser, newProfile);
        }
      );
    }
  };

  render() {
    const { unauthorized, loaded, authError } = this.props;
    if (loaded && !unauthorized) return <Redirect to="/" />;

    return (
      <div className="SignUp">
        <form onSubmit={this.handleSubmit} className="">
          <h3 className="">Sign Up</h3>
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
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              placeholder="Confirm Password"
              type="password"
              name="passwordConfirm"
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
            />
          </div>

          <div className="">
            <label htmlFor="firstName">First Name</label>
            <input
              placeholder="First Name"
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>

          <div className="">
            <label htmlFor="lastName">Last Name</label>
            <input
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div className="">
            <label htmlFor="number">Number</label>
            <input
              placeholder="Number"
              type="number"
              name="number"
              value={this.state.number}
              max="99"
              min="0"
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label className="" htmlFor="position">
              Position
            </label>
            <select
              className=""
              name="position"
              value={this.state.position}
              onChange={this.handleChange}
            >
              <option defaultValue="C">C</option>
              <option value="RW">RW</option>
              <option value="LW">LW</option>
              <option value="D">D</option>
              <option value="G">G</option>
            </select>
          </div>

          <div>
            <label className="" htmlFor="shoots">
              Shoots
            </label>
            <select
              className=""
              name="shoots"
              value={this.state.shoots}
              onChange={this.handleChange}
            >
              <option defaultValue="Right">Right</option>
              <option value="Left">Left</option>
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              name="addToPlayerList"
              value={this.state.addToPlayerList}
              onChange={this.handleChange}
            />
            <label htmlFor="current">
              <span>addToPlayerList</span>
            </label>
          </div>

          <div className="">
            <button type="submit" className="">
              Sign Up
            </button>
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
  // signUp: newUser => dispatch(signUp(newUser))
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignUp);

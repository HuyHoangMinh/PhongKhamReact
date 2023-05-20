import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "huyhoangminh@gmail.com",
      password: "1234",
      isShowPassword: false,
      errMessage: null,
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleLogin = async () => {
    const { userLoginSuccess } = this.props;
    this.setState({ errMessage: null });
    try {
      let rs = await handleLogin(this.state.username, this.state.password);
      if (rs && rs.errCode) {
        this.setState({ errMessage: rs.message });
      }
      if (rs && !rs.errCode) {
        this.props.userLoginSuccess(rs.data);
        console.log("login success");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data)
          this.setState({ errMessage: e.response.data.message });
      }
      //console.log(e);
    }
  };

  handleShowHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text mb-3"> Login</div>
            <div className="col-12 form-group login-input">
              <label>Username :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              ></input>
            </div>
            <div className="col-12 form-group login-input">
              <label>Password :</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                ></input>

                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="clo-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>

            <div className="col-12 forgot-password">
              <span>Forgot your password</span>
            </div>
            <div className="col-12 login-with mt-4">
              <span> Or sign in with</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-google-plus-g google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

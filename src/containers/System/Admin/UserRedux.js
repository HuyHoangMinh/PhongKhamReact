import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import UserManageRedux from "./UserManageRedux";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "",
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImage: "",
      isOpenImage: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      id: 0,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genders = this.props.genderRedux;
      this.setState({
        genderArr: genders,
        gender: genders && genders.length > 0 ? genders[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let positions = this.props.positionRedux;
      this.setState({
        positionArr: positions,
        position: positions && positions.length > 0 ? positions[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let roles = this.props.roleRedux;
      this.setState({
        roleArr: roles,
        role: roles && roles.length > 0 ? roles[0].key : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let genders = this.props.genderRedux;
      let roles = this.props.roleRedux;
      let positions = this.props.positionRedux;
      this.setState(
        {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          previewImage: "",
          gender: genders[0].key,
          position: positions[0].key,
          role: roles && roles.length > 0 ? roles[0].key : "",
          action: CRUD_ACTIONS.CREATE,
        },
        () => {}
      );
    }
  }
  handleOnChangeImage = async (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      let fileBase64 = await CommonUtils.getBase64(selectedFile);
      this.setState({
        previewImage: URL.createObjectURL(selectedFile),
        avatar: fileBase64,
      });
    }
  };
  OpenImageFullScreen = () => {
    if (this.state.previewImage) {
      this.setState({ isOpenImage: true });
    }
  };
  CheckValidData = () => {
    let fieldValid = "";
    let dtCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "position",
      "role",
    ];
    for (let i = 0; i < dtCheck.length; i++) {
      if (!this.state[dtCheck[i]]) {
        //isValid = false;
        fieldValid = dtCheck[i];
        break;
      }
    }
    return fieldValid;
  };
  SaveUser = () => {
    //let validField = "";
    let validField = this.CheckValidData();
    let action = this.state.action;
    if (validField === "") {
      if (action === CRUD_ACTIONS.CREATE) {
        this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          genderId: this.state.gender,
          positionId: this.state.position,
          roleId: this.state.role,
          avatar: this.state.avatar,
        });
      } else if (action === CRUD_ACTIONS.UPDATE) {
        this.props.updateUser({
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          genderId: this.state.gender,
          positionId: this.state.position,
          roleId: this.state.role,
          id: this.state.id,
          avatar: this.state.avatar,
        });
      }
      setTimeout(() => {
        this.props.getAllUserRedux();
      }, 1000);
    } else alert("Please enter data into : " + validField);
  };
  onChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value === undefined ? "" : event.target.value;
    this.setState({ ...copyState }, () => {});
  };
  handleEditUserFromParent = (user) => {
    if (user) {
      let imageBase64 = "";
      if (user.avatar) imageBase64 = CommonUtils.readFileBase64(user.avatar);
      //imageBase64 = new Buffer(user.avatar, "base64").toString("binary");

      this.setState({
        email: user.email,
        password: "HARDCODE",
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        gender: user.genderId,
        position: user.positionId,
        role: user.roleId,
        avatar: imageBase64,
        previewImage: imageBase64,
        action: CRUD_ACTIONS.UPDATE,
        id: user.id,
      });
    }
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <React.Fragment>
        <div className="user-container">
          <div className="title">Manage user using REDUX</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12 mb-3">
                  <FormattedMessage id="manage-user.title" />
                </div>
                <div className="col-3">
                  <FormattedMessage id="manage-user.email" />
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) => {
                      this.onChangInput(event, "email");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => {
                      this.onChangInput(event, "password");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(event) => {
                      this.onChangInput(event, "firstName");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(event) => {
                      this.onChangInput(event, "lastName");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(event) => {
                      this.onChangInput(event, "phoneNumber");
                    }}
                  />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(event) => {
                      this.onChangInput(event, "address");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangInput(event, "gender");
                    }}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVI
                              : item.valueEN}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangInput(event, "position");
                    }}
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVI
                              : item.valueEN}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangInput(event, "role");
                    }}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVI
                              : item.valueEN}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.imageUser" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      type="file"
                      id="previewImage"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label className="label-upload" htmlFor="previewImage">
                      Tải ảnh
                      <i className="fa fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImage})`,
                      }}
                      onClick={() => this.OpenImageFullScreen()}
                    ></div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <button
                    type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.UPDATE
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => this.SaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.UPDATE ? (
                      <FormattedMessage id="manage-user.update" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
                <div className="col-sm-12 mt-3">
                  <UserManageRedux
                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpenImage === true && (
          <Lightbox
            mainSrc={this.state.previewImage}
            onCloseRequest={() => this.setState({ isOpenImage: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listUsers: state.admin.users,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    updateUser: (data) => dispatch(actions.updateUser(data)),
    getAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

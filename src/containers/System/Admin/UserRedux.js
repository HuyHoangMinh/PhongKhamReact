import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImage: "",
      isOpenImage: false,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({ genderArr: this.props.genderRedux });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({ positionArr: this.props.positionRedux });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({ roleArr: this.props.roleRedux });
    }
  }
  handleOnChangeImage = (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      this.setState({ previewImage: URL.createObjectURL(selectedFile) });
    }
  };
  OpenImageFullScreen = () => {
    if (this.state.previewImage) {
      this.setState({ isOpenImage: true });
    }
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
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
                  <input type="email" className="form-control" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input type="password" className="form-control" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select className="form-control">
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <select className="form-control">
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <select className="form-control">
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <button type="submit" className="btn btn-primary">
                    <FormattedMessage id="manage-user.save" />
                  </button>
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
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

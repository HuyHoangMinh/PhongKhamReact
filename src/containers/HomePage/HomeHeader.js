import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { setChangeLanguageApp } from "../../store/actions/appActions";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.ChangeLanguageApp(language);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homepage.speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homepage.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homepage.health-facilities" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homepage.choose-hopital" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div className="sub-title">Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div className="sub-title">Khám tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"> Hỗ trợ</i>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
          <div className="home-image-content"></div>
        </div>
        <div className="home-header-search">
          <div className="tim-kiem">
            <div className="vung-bao">
              <div className="title1">
                nền tảng y tế
                <br />
                <b>chăm sóc sức khỏe toàn diện</b>
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm thông tin" />
              </div>
            </div>
          </div>
          <div className="home-header-bottom">
            <div className="options">
              <div className="option-child">
                <i className="fas fa-hospital-alt"></i>
                <div className="option-child-text">Khám chuyên khoa</div>
              </div>
              <div className="option-child">
                <i className="fas fa-mobile-alt"></i>
                <div className="option-child-text">Khám từ xa</div>
              </div>
              <div className="option-child">
                <i className="fas fa-procedures"></i>
                <div className="option-child-text">Khám tổng quát</div>
              </div>
              <div className="option-child">
                <i className="fas fa-flask"></i>
                <div className="option-child-text">Xét nghiệm </div>
              </div>
              <div className="option-child">
                <i className="fas fa-user-md"></i>
                <div className="option-child-text">Sức khỏe tinh thần</div>
              </div>
              <div className="option-child">
                <i className="fas fa-briefcase-medical"></i>
                <div className="option-child-text">Khám nha khoa</div>
              </div>
              <div className="option-child">
                <i className="fas fa-diagnoses"></i>
                <div className="option-child-text">Gói phẫu thuật</div>
              </div>
              <div className="option-child">
                <i className="fas fa-ambulance"></i>
                <div className="option-child-text">Sản phẩm y tế</div>
              </div>
              <div className="option-child">
                <i className="fas fa-tasks"></i>
                <div className="option-child-text">Bài text sức khỏe</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ChangeLanguageApp: (language) => {
      dispatch(setChangeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);

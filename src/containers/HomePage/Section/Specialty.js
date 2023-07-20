import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  async componentDidMount() {
    this.props.getAllDoctorRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDoctor !== this.props.listDoctor) {
      let arrDoctorRedux = this.props.listDoctor;
      this.setState({
        arrDoctor: arrDoctorRedux,
      });
    }
  }

  render() {
    let data = this.state.arrDoctor;
    let language = this.props.language;
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 5,
      //centerMode: true,
      //autoplay: true,
      //autoplaySpeed: 2000,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <h2>Bác sỹ nổi bật trong tuần</h2>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  let imageBase64 = "";
                  if (item.avatar)
                    imageBase64 = new Buffer(item.avatar, "base64").toString(
                      "binary"
                    );
                  let nameVI = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEN = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="specialty-customize" key={item.id}>
                      <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <div className="bg-text">
                        {language === LANGUAGES.VI ? nameVI : nameEN}
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    listDoctor: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

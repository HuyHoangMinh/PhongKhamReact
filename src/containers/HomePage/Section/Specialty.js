import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImgTest from "../../../assets/images/113353-da-lieu-tham-my.jpg";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 4,
      //centerMode: true,
      //autoplay: true,
      //autoplaySpeed: 2000,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <h2>CHUYÊN KHOA PHỔ BIẾN</h2>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div className="bg-text">Chuyen khoa 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div className="bg-text">Chuyen khoa 2</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div className="bg-text">Chuyen khoa 3</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div className="bg-text">Chuyen khoa 4</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div className="bg-text">Chuyen khoa 5</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div className="bg-text">Chuyen khoa 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

import React, { Component } from "react";
import { connect } from "react-redux";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className="user-container">
          <div className="title">Manage user using REDUX</div>
          <div className="user-body">
            <div className="add-new">Thêm</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

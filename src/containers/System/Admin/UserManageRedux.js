import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManageRedux.scss";
import * as actions from "../../../store/actions";
class UserManageRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  async componentDidMount() {
    this.props.getAllUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUser !== this.props.listUser) {
      let listUserRedux = this.props.listUser;
      this.setState({
        userRedux: listUserRedux,
      });
    }
  }
  handleDeleteUser(user) {
    this.props.deleteUserRedux(user.id);
  }
  handleEditUser(user) {
    this.props.handleEditUserFromParentKey(user);
  }
  render() {
    let data = this.state.userRedux;
    return (
      <div>
        <table id="customers">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td className="">
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fa fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUserStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);

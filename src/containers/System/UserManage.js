import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
} from "../../services/userService";
import "./UserManage.scss";
import UserModal from "./UserModal";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = { arrUsers: [], isOpenModalUser: false };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.data.length > 0) {
      this.setState({ arrUsers: response.data });
    }
  };

  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };
  handleDeleteUser = async (user) => {
    //console.log("data:", user);
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errMsg > "") {
        alert(response.errMsg);
      } else if (response && !response.error) {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.error(error);
    }
  };
  createNewUser = async (data, isCloseModal) => {
    try {
      let response = await createNewUserService(data);
      console.log(response);
      if (response && response.errMsg > "") {
        alert(response.errMsg);
      } else if (response && !response.error) {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalUser: !isCloseModal });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your emitter id" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    let data = this.state.arrUsers;
    return (
      <React.Fragment>
        <div className="user-container">
          <UserModal
            isOpen={this.state.isOpenModalUser}
            toggleFromParent={this.toggleUserModal}
            createNewUser={this.createNewUser}
          />
          <div className="title text-center">Manager Users</div>
          <div className="mx-4">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fas fa-plus"> Add new user</i>
            </button>
          </div>
          <div className="user-table my-4 mx-4">
            <table id="customers">
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
                    <>
                      <tr>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td className="">
                          <button className="btn-edit">
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
                    </>
                  );
                })}
            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

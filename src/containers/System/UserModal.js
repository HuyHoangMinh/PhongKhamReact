import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing data on : ${arrInput[i]}`);
        break;
      }
    }

    return isValid;
  };
  handleAddNew = (isCloseModal) => {
    let isValid = this.checkValideInput();
    if (isValid) {
      this.props.createNewUser(this.state, isCloseModal);
    } else alert("missing input required");
  };
  componentDidMount() {}

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
              />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            <div className="input-container max-with-input">
              <label>Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-4"
            onClick={() => {
              this.handleAddNew(true);
            }}
          >
            Save
          </Button>{" "}
          <Button
            color="warning"
            className="px-4"
            onClick={() => {
              this.handleAddNew(false);
            }}
          >
            Save & Continue
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);

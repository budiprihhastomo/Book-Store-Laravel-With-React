import React, { Component } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";

// Component
import Modal from "../components/Modal";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            role: 1
        };
        this._actionLogin = this._actionLogin.bind(this);
    }

    _actionLogin() {
        return Axios.post(`${API_SERVER}/auth/register`, {
            ...this.state
        })
            .then(() => {
                alert("Pendaftaran Berhasil Dilakukan !");
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <>
                <div className="container"></div>
                <Modal
                    name="modalRegister"
                    title="Register Form"
                    actionNameButton="Register"
                    actionButton={this._actionLogin}
                >
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">
                                Full Name{" "}
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                aria-describedby="name"
                                placeholder="Enter Your Full Name"
                                onChange={({ target }) =>
                                    this.setState({ name: target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">
                                Role <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="form-control"
                                defaultValue=""
                                onChange={({ target }) =>
                                    this.setState({ role: target.value })
                                }
                            >
                                <option value="" disabled>
                                    Choose Role
                                </option>
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_register">
                                E-mail <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email_register"
                                name="email_register"
                                aria-describedby="email_register"
                                placeholder="Enter email"
                                autoComplete="false"
                                onChange={({ target }) =>
                                    this.setState({ email: target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_register">
                                Password <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password_register"
                                name="password_register"
                                placeholder="Password"
                                onChange={({ target }) =>
                                    this.setState({ password: target.value })
                                }
                            />
                        </div>
                    </form>
                </Modal>
            </>
        );
    }
}

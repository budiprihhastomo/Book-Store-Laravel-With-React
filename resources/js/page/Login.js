import React, { Component } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";

// Component
import Modal from "../components/Modal";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
        this._actionLogin = this._actionLogin.bind(this);
    }

    _actionLogin() {
        return Axios.post(`${API_SERVER}/auth/login`, {
            ...this.state
        })
            .then(({ data }) => {
                localStorage.setItem(
                    "authorization",
                    JSON.stringify({ ...data, isLoggedIn: true })
                );
                window.location.reload();
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <>
                <div className="container"></div>
                <Modal
                    name="modalLogin"
                    title="Login Form"
                    actionNameButton="Login"
                    actionButton={this._actionLogin}
                >
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">
                                E-mail <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                aria-describedby="email"
                                placeholder="Enter Your E-mail"
                                autoComplete="false"
                                onChange={({ target }) =>
                                    this.setState({ email: target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                Password <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter Your Password"
                                onChange={({ target }) =>
                                    this.setState({ password: target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <a
                                data-toggle="modal"
                                href="#modalForgetPassword"
                                data-dismiss="modal"
                            >
                                Forget Password ?
                            </a>
                        </div>
                    </form>
                </Modal>
            </>
        );
    }
}

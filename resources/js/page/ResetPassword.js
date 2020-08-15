import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";
import tes from "qs";

export default props => {
    const [password, setPassword] = useState("");
    const [_, setPasswordConfirm] = useState("");

    const _actionReset = () => {
        if (password !== _) return false;
        const q = new URLSearchParams(props.location.search);
        return Axios.post(
            `${API_SERVER}/auth/password/reset`,
            { password },
            { params: { token: q.get("token"), email: q.get("email") } }
        )
            .then(({ data }) => {
                alert("Kata Sandi Berhasil Direset.");
                props.history.push("/");
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <div className="mt-5">
                <div className="card">
                    <div className="card-header bg-transparent">
                        Reset Password
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Password{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password_reset"
                                    name="password_reset"
                                    aria-describedby="password_reset"
                                    placeholder="Enter Your New Password"
                                    autoComplete="false"
                                    onChange={({ target }) =>
                                        setPassword(target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_reset_confirm">
                                    Password Confirm{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password_reset_confirm"
                                    name="password_reset_confirm"
                                    aria-describedby="password_reset_confirm"
                                    placeholder="Enter Your New Password Confirm"
                                    autoComplete="false"
                                    onChange={({ target }) =>
                                        setPasswordConfirm(target.value)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                        <button
                            className="btn btn-md btn-primary"
                            onClick={_actionReset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

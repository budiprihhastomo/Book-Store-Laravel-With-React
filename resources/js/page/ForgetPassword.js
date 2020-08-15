import React, { useState } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";

// Component
import Modal from "../components/Modal";

export default () => {
    const [email, setEmail] = useState("");

    const _actionForget = () => {
        return Axios.post(`${API_SERVER}/auth/password/forget`, { email })
            .then(({ data }) => {
                alert("Reset Kata Sandi Berhasil Dikirim.");
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <Modal
                name="modalForgetPassword"
                title="Forget Password ?"
                actionNameButton="Send Request"
                actionButton={_actionForget}
            >
                <form>
                    <div className="form-group">
                        <label htmlFor="email">
                            E-mail <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email_forget"
                            name="email_forget"
                            aria-describedby="email_forget"
                            placeholder="Enter Your E-mail"
                            autoComplete="false"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
};

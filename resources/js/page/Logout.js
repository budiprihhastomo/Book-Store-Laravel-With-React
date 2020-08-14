import React, { Component } from "react";

// Component
import Modal from "../components/Modal";

export default class Logout extends Component {
    constructor() {
        super();
        this._logout = this._logout.bind(this);
    }

    _logout() {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return (
            <>
                <div className="container"></div>
                <Modal
                    name="modalLogout"
                    title="Logout ?"
                    actionNameButton="Log Out"
                    actionButton={this._logout}
                >
                    <div className="container">
                        <h3>Are You Sure To Exit From Application ?</h3>
                    </div>
                </Modal>
            </>
        );
    }
}

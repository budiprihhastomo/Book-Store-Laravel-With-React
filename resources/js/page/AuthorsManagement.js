import React, { Component, useState } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";
import Modal from "../components/Modal";

const ModalBooks = props => {
    const [modal, setModal] = useState({
        first_name: props.state.first_name || "",
        middle_name: props.state.first_name || "",
        last_name: props.state.last_name || ""
    });
    const saveData = () => {};

    return (
        <Modal
            name="modalAuthorsManagement"
            title="Author Management Form"
            actionNameButton="Save"
            actionButton={saveData}
        >
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="first_name">
                            First Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            aria-describedby="first_name"
                            placeholder="First Name"
                            value={props.state.first_name}
                            onChange={({ target }) =>
                                setModal({ ...modal, first_name: target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="middle_name">
                            Middle Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            name="middle_name"
                            aria-describedby="middle_name"
                            value={props.state.middle_name}
                            placeholder="Middle Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">
                            Last Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                            value={props.state.last_name}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default class AuthorsManagement extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            modal: {}
        };
        this.removeData = this.removeData.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        Axios.get(`${API_SERVER}/author`, {
            headers: {
                authorization: (
                    JSON.parse(localStorage.getItem("authorization")) || {}
                ).access_token
            }
        })
            .then(({ data }) => {
                this.setState({ data: data.data });
            })
            .catch(err => console.error(err));
    }

    removeData(id) {
        Axios.delete(`${API_SERVER}/author/${id}`, {
            headers: {
                authorization:
                    "Bearer " +
                    (JSON.parse(localStorage.getItem("authorization")) || {})
                        .access_token
            }
        })
            .then(({ data }) => {
                this.fetchData();
            })
            .catch(err => console.error(err));
    }

    openModal(data) {
        ModalBooks(data);
    }

    render() {
        return (
            <>
                <div className="mt-5">
                    <div className="card">
                        <div className="card-header bg-transparent">
                            Books Management
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                {item.first_name +
                                                    " " +
                                                    item.middle_name +
                                                    " " +
                                                    item.last_name}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    style={{
                                                        marginRight: "10px"
                                                    }}
                                                    data-toggle="modal"
                                                    data-target="#modalAuthorsManagement"
                                                    onClick={() =>
                                                        this.setState({
                                                            modal: item
                                                        })
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                {(
                                                    (
                                                        JSON.parse(
                                                            localStorage.getItem(
                                                                "authorization"
                                                            )
                                                        ) || {}
                                                    ).user || {}
                                                ).role === 1 ? (
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            this.removeData(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ModalBooks state={this.state.modal} />
            </>
        );
    }
}

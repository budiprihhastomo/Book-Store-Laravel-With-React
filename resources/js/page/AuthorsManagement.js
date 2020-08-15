import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";
import Modal from "../components/Modal";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { authorManagementState } from "../atom/global";

const ModalAuthor = props => {
    const authorModalState = useRecoilState(authorManagementState);
    const setAuthorModalState = useSetRecoilState(authorManagementState);

    const saveData = () => {
        if (authorModalState[0].id) {
            Axios.patch(
                `${API_SERVER}/author/${authorModalState[0].id}`,
                authorModalState[0],
                {
                    headers: {
                        authorization:
                            "Bearer " +
                            (
                                JSON.parse(
                                    localStorage.getItem("authorization")
                                ) || {}
                            ).access_token
                    }
                }
            )
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.error(err));
        } else {
            Axios.post(`${API_SERVER}/author`, authorModalState[0], {
                headers: {
                    authorization:
                        "Bearer " +
                        (
                            JSON.parse(localStorage.getItem("authorization")) ||
                            {}
                        ).access_token
                }
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.error(err));
        }
        props.onRefresh();
    };

    const onChangeHandle = ({ target }) => {
        return setAuthorModalState(oldState => ({
            ...oldState,
            [target.name]: target.value
        }));
    };

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
                            value={authorModalState[0].first_name}
                            onChange={onChangeHandle}
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
                            placeholder="Middle Name"
                            value={authorModalState[0].middle_name}
                            onChange={onChangeHandle}
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
                            value={authorModalState[0].last_name}
                            onChange={onChangeHandle}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default () => {
    const setAuthorModalState = useSetRecoilState(authorManagementState);
    const resetAuthorModalState = useResetRecoilState(authorManagementState);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get(`${API_SERVER}/author`, {
            headers: {
                authorization: (
                    JSON.parse(localStorage.getItem("authorization")) || {}
                ).access_token
            }
        })
            .then(({ data }) => {
                setData(data.data);
            })
            .catch(err => console.error(err));
    };

    const removeData = id => {
        Axios.delete(`${API_SERVER}/author/${id}`, {
            headers: {
                authorization:
                    "Bearer " +
                    (JSON.parse(localStorage.getItem("authorization")) || {})
                        .access_token
            }
        })
            .then(() => {
                fetchData();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <div className="mt-5">
                <div className="card">
                    <div className="card-header bg-transparent">
                        <div className="d-flex justify-content-between">
                            Author Management
                            <button
                                className="btn btn-sm btn-success"
                                data-toggle="modal"
                                data-target="#modalAuthorsManagement"
                                onClick={resetAuthorModalState}
                            >
                                +
                            </button>
                        </div>
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
                                {data.map((item, idx) => (
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
                                                    setAuthorModalState(item)
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
                                                        removeData(item.id)
                                                    }
                                                >
                                                    Delete
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
            <ModalAuthor onRefresh={fetchData} />
        </>
    );
};

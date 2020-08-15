import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";
import Modal from "../components/Modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bookManagementState } from "../atom/global";

const ModalBooks = () => {
    const bookModalState = useRecoilState(bookManagementState);
    const setBookModalState = useSetRecoilState(bookManagementState);

    const onChangeHandle = ({ target }) => {
        return setBookModalState(oldState => ({
            ...oldState,
            [target.name]: target.value
        }));
    };
    return (
        <Modal
            name="modalBooksManagement"
            title="Books Management Form"
            actionNameButton="Save"
            actionButton={null}
        >
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">
                            Book Title <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            aria-describedby="title"
                            placeholder="Enter Book Title"
                            value={bookModalState[0].title}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">
                            Rating <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                            className="form-control"
                            name="rating"
                            id="rating"
                            value={bookModalState[0].rating}
                            onChange={onChangeHandle}
                        >
                            <option value="" disabled>
                                Choose Rating
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            ISBN <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            name="isbn"
                            aria-describedby="isbn"
                            placeholder="Enter ISBN"
                            value={bookModalState[0].isbn}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="total_pages">
                            Total Pages <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="total_pages"
                            name="total_pages"
                            placeholder="How many pages ?"
                            value={bookModalState[0].total_pages}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="published_date">
                            Published Date{" "}
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="published_date"
                            name="published_date"
                            value={bookModalState[0].published_date}
                            onChange={onChangeHandle}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default () => {
    const [data, setData] = useState([]);
    const setBookModalState = useSetRecoilState(bookManagementState);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get(`${API_SERVER}/book`, {
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
        Axios.delete(`${API_SERVER}/book/${id}`, {
            headers: {
                authorization:
                    "Bearer " +
                    (JSON.parse(localStorage.getItem("authorization")) || {})
                        .access_token
            }
        })
            .then(() => {
                this.fetchData();
            })
            .catch(err => console.error(err));
    };

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
                                    <th>Title</th>
                                    <th>Total Pages</th>
                                    <th>Rating</th>
                                    <th>ISBN</th>
                                    <th>Published Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.title}</td>
                                        <td>{item.total_pages}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.isbn}</td>
                                        <td>{item.published_date}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info"
                                                style={{
                                                    marginRight: "10px"
                                                }}
                                                data-toggle="modal"
                                                data-target="#modalBooksManagement"
                                                onClick={() =>
                                                    setBookModalState(item)
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
            <ModalBooks />
        </>
    );
};

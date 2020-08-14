import React, { Component, useState } from "react";
import Axios from "axios";
import { API_SERVER } from "../constant/values";
import Modal from "../components/Modal";

const ModalBooks = props => {
    const [modal, setModal] = useState({
        title: props.state.title || "",
        rating: props.state.rating || "",
        isbn: props.state.isbn || "",
        total_pages: props.state.total_pages || "",
        published_date: props.state.published_date
    });

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
                            value={props.state.title}
                            onChange={({ target }) =>
                                setModal({ ...modal, title: target.value })
                            }
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
                            value={props.state.rating}
                        >
                            <option selected disabled>
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
                            value={props.state.isbn}
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
                            value={props.state.total_pages}
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
                            value={props.state.published_date}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default class BooksManagement extends Component {
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
        Axios.get(`${API_SERVER}/book`, {
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
        Axios.delete(`${API_SERVER}/book/${id}`, {
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
                                        <th>Title</th>
                                        <th>Total Pages</th>
                                        <th>Rating</th>
                                        <th>ISBN</th>
                                        <th>Published Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((item, idx) => (
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

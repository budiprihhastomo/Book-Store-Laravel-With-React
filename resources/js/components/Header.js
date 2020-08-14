import React from "react";

export default props => {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a className="navbar-brand" href="#">
                Book Store
            </a>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav mr-auto">
                    {(JSON.parse(localStorage.getItem("authorization")) || {})
                        .isLoggedIn ? (
                        <>
                            <li
                                className={`nav-item${
                                    props.location.pathname === "/books"
                                        ? " active"
                                        : ""
                                }`}
                            >
                                <a
                                    className="nav-link"
                                    onClick={() => props.history.push("/books")}
                                >
                                    Books Management{" "}
                                </a>
                            </li>
                            <li
                                className={`nav-item${
                                    props.location.pathname === "/authors"
                                        ? " active"
                                        : ""
                                }`}
                            >
                                <a
                                    className="nav-link"
                                    onClick={() =>
                                        props.history.push("/authors")
                                    }
                                >
                                    Authors Management
                                </a>
                            </li>
                        </>
                    ) : null}
                </ul>
                <ul className="navbar-nav">
                    {!(JSON.parse(localStorage.getItem("authorization")) || {})
                        .isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    data-toggle="modal"
                                    data-target="#modalLogin"
                                >
                                    Login
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    data-toggle="modal"
                                    data-target="#modalRegister"
                                >
                                    Register
                                </button>
                            </li>
                        </>
                    ) : null}
                    {(JSON.parse(localStorage.getItem("authorization")) || {})
                        .isLoggedIn ? (
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-dark"
                                data-toggle="modal"
                                data-target="#modalLogout"
                            >
                                Logout
                            </button>
                        </li>
                    ) : null}
                </ul>
            </div>
        </nav>
    );
};

import React from "react";

export default props => {
    return (
        <div
            className="modal fade"
            id={props.name}
            tabIndex="-1"
            aria-labelledby={props.name}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{props.children}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={props.actionButton}
                        >
                            {props.actionNameButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

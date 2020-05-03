import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div
            onClick={props.onDismiss}
            className="ui modals dimmer visible active"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="ui standard modal visible active"
            >
                {/* the above event handler will prevent event bubbling from inside the centre modal div and triggering the onClick eventListener in the parent element*/}
                <div className="header">{props.title}</div>
                <div className="content">{props.description}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector("#modal")
    );
};

export default Modal; //Reuseable for any component or page that requires a modal

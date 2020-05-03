import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.getStream(this.props.match.params.id); //to display the title
    }

    onDismiss() {
        history.push("/"); //if user clicks anywhere on the page other than the centre div
    }
    generateDescription = () => {
        if (!this.props.stream) {
            //the render method will be executed once before componentDidMount will be executed, hence, the stream prop will be undefined for a split second.
            return "Are you sure that you want to delete this stream?";
        } else {
            return `Are you sure that you want to delete this stream titled "${this.props.stream.title}"?`;
        }
    };
    generateActions = () => {
        const { deleteStream, match } = this.props; //before destructuring always question whether of not the variable you are trying to destructure will ever be undefined or null or not an object
        return (
            <>
                {/* this is a React.Fragment which fulfills the jsx requirement of having only one parent element, yet does not render any html in the DOM */}
                <button
                    className="ui negative button"
                    onClick={() => {
                        deleteStream(match.params.id);
                    }}
                >
                    Delete
                </button>
                <Link className="ui button" to="/">
                    Cancel
                </Link>
            </>
        );
    };
    render() {
        return (
            <Modal
                onDismiss={this.onDismiss} //callbacks not ran immediately from render need to be wrapped by an arrows function or be an arrows function to get access to "this" variable
                title="Delete a Stream"
                description={this.generateDescription()} //functions that are ran immediatele from render do not have this requirement
                actions={this.generateActions()}
            ></Modal>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { getStream, deleteStream })(
    StreamDelete
);

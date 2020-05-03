import React from "react";
import { connect } from "react-redux";
import { getStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.getStream(this.props.match.params.id); //need to ensure that there is id provided by user in url
    }
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };
    renderLogic() {
        if (this.props.stream) {
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    <StreamForm
                        onSubmit={this.onSubmit}
                        initialValues={{
                            title: this.props.stream.title,
                            description: this.props.stream.description,
                        }}
                    />
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
    render() {
        return <div>{this.renderLogic()}</div>;
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { getStream, editStream })(StreamEdit);

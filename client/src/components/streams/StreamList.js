import React from "react";
import { connect } from "react-redux";
import { getStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
    componentDidMount() {
        this.props.getStreams();
    }
    renderAdmin(stream, currentUserId) {
        if (stream.userId === currentUserId) {
            return (
                <div className="right floated">
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className="ui basic button"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui negative button"
                    >
                        Delete
                    </Link>
                </div>
            );
        }
        return null;
    }
    renderList = () => {
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream, this.props.currentUserId)}
                    <i className="ui icon camera large middle aligned" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };
    render() {
        return (
            <div>
                <div className="ui celled list">{this.renderList()}</div>
                <Link
                    to="/streams/new"
                    className="ui primary button right floated"
                >
                    Create Stream
                </Link>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
    };
};
export default connect(mapStateToProps, { getStreams })(StreamList);

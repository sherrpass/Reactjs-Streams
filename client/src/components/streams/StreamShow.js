import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { getStream } from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }
    componentDidMount() {
        this.props.getStream(this.props.match.params.id);
        this.createFlvPlayer();
    }
    componentDidUpdate() {
        this.createFlvPlayer();
    }
    componentWillUnmount() {
        this.player.destroy();
    }
    createFlvPlayer() {
        if (!this.videoRef || !this.props.stream) {
            return;
        }

        this.player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`,
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        const { stream } = this.props;

        return (
            <div>
                <video ref={this.videoRef} style={{ width: "100%" }} controls />
                <h1>{stream.title}</h1>
                <h3>{stream.description}</h3>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { getStream })(StreamShow);

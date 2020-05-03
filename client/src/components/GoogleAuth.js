import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        //load relevant portion of gapi
        window.gapi.load("client:auth2", () => {
            //init google api authO library
            window.gapi.client //returns promise
                .init({
                    clientId:
                        "65296736441-fvd41l08pb7ih61o54gfqhftpi50djkt.apps.googleusercontent.com",
                    scope: "email", // what you want access about the user from google
                })
                .then(() => {
                    //get data about whether the user is signed in or not to the gapi
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange); //set an listener to a change in sign in/out status via google autho
                });
        });
    }

    onSignInClick = () => {
        this.auth.signIn(); //async, returns a promise
    };

    onSignOutClick = () => {
        this.auth.signOut(); //not async
    };

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }
    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

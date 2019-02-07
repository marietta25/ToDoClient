import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn, logOut } from '../actions';

class Auth extends React.Component {    
    componentDidMount() {
        this.onAuthChange(sessionStorage.isSignedIn);
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn === 'true') {
            this.props.logIn();
            
        } else {
            this.props.logOut();
        }
    }

    onLogout =() => {
        this.props.logOut();
    }

    // Render logout button when user is logged in
    // Render log in and register buttons when user is logged out
    renderAuth() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui labeled icon button" onClick={this.onLogout}>
                    <i className="sign out icon" />Log out
                </button>
            )
        } else {
            return (
                <div >
                <Link to='/login' className="ui labeled icon button">
                    <i className="sign in icon" />Log in
                </Link>
                <Link to='/register' className="ui labeled icon button">
                    <i className="user icon" />Register
                </Link>
                </div>
            );
        }
    }

    // Show user's name and username when logged in
    renderUserData() {
        if (this.props.isSignedIn) {
            let userHeader;
            if (sessionStorage.firstName === 'null' && sessionStorage.lastName === 'null') {
                userHeader = `${sessionStorage.email}`;
            } else if (sessionStorage.firstName === 'null') {
                userHeader = `${sessionStorage.lastName} ${sessionStorage.email}`;
            } else if (sessionStorage.lastName === 'null') {
                userHeader = `${sessionStorage.firstName} ${sessionStorage.email}`;
            } else {
                userHeader = `${sessionStorage.firstName} ${sessionStorage.lastName} (${sessionStorage.email})`;
            }
            return (
                <div>{userHeader}</div>
            );
        }
        
        return null;       
    }

    renderErrors() {
        let errorText = null;
        if (this.props.loader.error) {
            if (this.props.loader.error.error_description) {
                errorText = this.props.loader.error.error_description;
            } else if (this.props.loader.error.Message) {
                errorText = this.props.loader.error.Message;
            } else {
                errorText = 'Oops! Something went wrong';
            }
            return (
                <p className="ui negative message">{errorText}</p>
            );
        }
        return null;
    }
    
    render() {
        return (
            <div style={{ marginTop: 20, marginBottom: 30 }}>
                <div>{this.renderErrors()}</div>
                <h2>To-Do Tasks</h2>
                <div style={{ marginBottom: 10 }}>{this.renderUserData()}</div>
                <div>{this.renderAuth()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        user: state.user,
        loader: state.loader
    };
};


export default connect(mapStateToProps, {logIn, logOut })(Auth);
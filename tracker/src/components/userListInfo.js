import React from 'react';
import "../styles/userListInfo.css";

class UserListInfo extends React.Component {
    render() {
        const {currentUser} = this.props;

        return (
            <div className="user-list-info-container" onClick={this.props.onUserChanged}>
                <img className="user-list-avatar" src={currentUser.avatar} alt="User avatar"/>
                <div className="user-list-text">{currentUser.login}</div>
            </div>
        );
    }
}

export default UserListInfo;
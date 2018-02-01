import React from 'react';
import "../styles/userNavigationInfo.css";

class UserNavigationInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {currentUser} = this.props;

        if (!currentUser)
            return "";

        const currentRepoInView = (currentUser.repo) ?
            <div className="user-text"> / {currentUser.repo}</div> : "";

        return (
            <div className="user-info-container-selected">
                <img className="avatar" src={currentUser.avatar}/>
                <div className="user-text-container">
                    <div>
                        <div className="user-text">{currentUser.login}</div>
                        {currentRepoInView}
                    </div>

                    <div className="user-text" onClick={this.navigateToUrl}>{currentUser.profileUrl}</div>
                </div>
                <div className="close-button" onClick={() => this.props.onUserRemoved()}>✘</div>
            </div>
        );
    }

    navigateToUrl = () => {
        document.location.href = this.props.currentUser.profileUrl;
    }
}

export default UserNavigationInfo;
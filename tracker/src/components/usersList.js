import React from "react"
import UserData from "../data/userData";
import UserListInfo from "./userListInfo";
import "../styles/usersList.css";

class UsersList extends React.Component {

    updateData = (props) => {
        const data = UserData.build(props.data);

        this.setState({
            users: data.users,
            totalUsersCount: data.total
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            totalUsersCount: 0
        };
    }

    componentWillReceiveProps(newProps) {
        this.updateData(newProps);
    }

    render () {
        const {users} = this.state;
        const {totalUsersCount} = this.state;

        return (
            <div className="user-items-container">
                <b>Total found: {totalUsersCount}</b>
                <div className="user-items-container-list">
                    {
                        users.map((item, index) => {
                            return <UserListInfo key={index}
                                                 currentUser={item}
                                                 onUserChanged={() => {
                                                     this.props.onUserChanged(item);
                                                 }} />;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default UsersList;
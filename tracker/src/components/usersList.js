import React from "react"
import UserData from "../data/userData";
import UserListInfo from "./userListInfo";
import "../styles/usersList.css";

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        const data = UserData.build(props.data);

        this.state = {
            users: data.users,
            totalUsersCount: data.total
        };
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
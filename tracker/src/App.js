import React, {Component} from "react";
import axios from "axios";

import UserNavigationInfo from "./components/userNavigationInfo";
import UsersList from "./components/usersList";
import RepoList from "./components/repoList";
import CommitChart from "./components/commitChart";

import "./styles/App.css";

class App extends Component {
    // Request users with > 3000 repos in the account.
    // Pagination was dropped consciously in all the requests

    // WARNING: Unauthorizated requests to github API is limited by 10 requests per minute,
    // So test please carefully, for except 403 response.
    GET_USERS_URL = "https://api.github.com/search/users?q=repos:%3E3000&per_page=100";

    userChangedHandler = (currentUser) => {
        this.setState({
            currentUser,
            currentRepoCommits: null
        })
    };

    repoChangedHandler = (currentRepoCommits) => {
        this.setState({
            currentRepoCommits
        })
    };

    constructor() {
        super();

        this.state = {
            totalUserReposCount: 0,
            currentUser: null, // typeof UserData
            currentRepoCommits: null,
            data: []
        };
    }

    componentDidMount() {
        axios.get(this.GET_USERS_URL)
            .then(response => {
                this.setState({
                    data: response.data
                })
            });
    }

    render() {
        const {data} = this.state;
        const {currentUser} = this.state;
        const {currentRepoCommits} = this.state;
        const commitChart = currentRepoCommits && currentUser ?
            <CommitChart currentRepoCommits={currentRepoCommits}/> : null;

        return (
            <div className="app-container">
                <div>
                    <UserNavigationInfo
                        currentUser={currentUser}
                        onUserRemoved={this.userChangedHandler}/>
                </div>

                <UsersList data={data} onUserChanged={this.userChangedHandler}/>

                {
                    (currentUser)
                        ? <RepoList currentUser={currentUser} onRepoChanged={this.repoChangedHandler}/>
                        : <div className="select-user-message">{`< Select user from the list`}</div>
                }

                {commitChart}

            </div>
        );
    }
}

export default App;
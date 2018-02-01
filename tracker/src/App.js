import React, {Component} from "react";
import axios from "axios";

import UserNavigationInfo from "./components/userNavigationInfo";
import UsersList from "./components/usersList";
import RepoList from "./components/repoList";
import CommitChart from "./components/commitChart";

import "./styles/App.css";

class App extends Component {
    // Select users with > 1000 repos in the account.
    GET_USERS_URL = "https://api.github.com/search/users?q=repos:%3E3000&per_page=1000";

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
                console.log("axios response:");
                console.log(response.data);
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
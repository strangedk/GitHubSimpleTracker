import React from "react";
import RepoData from "../data/repoData";
import axios from "axios";
import "../styles/repoList.css"

class RepoList extends React.Component {
    updateReposData = (user) => {
        axios.get(user.getReposUrl)
            .then((response) => {
                this.setState({
                    repos: RepoData.build(response.data) // Array of RepoData
                })
            });
    };

    getCommits = (repo) => {
        axios.get(repo.commitsUrl.replace("{/sha}", ""))
            .then((response) => {
                this.props.onRepoChanged(response.data);
            }).catch(() => {
            console.log("Error commit loading");
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
            repos: []
        };

        this.updateReposData(props.currentUser);
    }

    componentWillReceiveProps(newProps) {
        this.updateReposData(newProps.currentUser);
    };

    render() {
        return (
            <div className="repos-container">
                <b>Repositories</b>
                <ul className="repos-list">
                    {
                        this.state.repos && this.state.repos.map((item, index) => {
                            return <li className="repos-item" key={index}
                                       onClick={() => this.getCommits(item)}>{item.name}</li>;
                        })
                    }
                </ul>
            </div>)
    }
}

export default RepoList;
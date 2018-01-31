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
        return (<ul className="repos-container">
            {
                this.state.repos && this.state.repos.map((item, index) => {
                    return <li className="repos-item" key={index} onClick={() => this.navigateToUrl(item.link)}>{item.name}</li>;
                })
            }
        </ul>)
    }

    navigateToUrl = (link) => {
        document.location.href = link;
    }
}

export default RepoList;
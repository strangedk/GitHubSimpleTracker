// babel-plugin-transform-class-properties is works here, to make class-properties directly.

class RepoData {
    id = 0;
    name = "";
    fullName = "";
    link = "";
    avatar = "";
    language = "";
    commitsUrl = "";
    gitCommitsUrl = "";

    /**
     * Builds simplified entity of repo
     * @param dto from GitHub response
     * @returns {Array<RepoData>}
     */
    static build(dto) {
        const result = [];
        const repos = dto;
        for (let r in repos) {
            const repo = new RepoData();

            repo.id = repos[r].id;
            repo.name = repos[r].name;
            repo.fullName = repos[r].full_name;
            repo.link = repos[r].html_url;
            repo.avatar = repos[r].avatar_url;
            repo.language = repos[r].language;
            repo.commitsUrl = repos[r].commits_url;
            repo.gitCommitsUrl = repos[r].git_commits_url;

            result.push(repo);
        }

        return result;
    }
}

export default RepoData;
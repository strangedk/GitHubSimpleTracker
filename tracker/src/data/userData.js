// babel-plugin-transform-class-properties is works here, to make class-properties directly.

class UserData {
    id = 0;
    login = "";
    name = "";
    avatar = "";
    getReposUrl = "";
    profileUrl = "";

    /**
     * Builds simplified entity of user
     * @param dto from GitHub response
     * @returns {Array<UserData>}
     */
    static build(dto) {
        const result = [];
        const items = dto.items;
        console.log(dto);
        for (let u in items) {
            const user = new UserData();

            user.id = items[u].id;
            user.login = items[u].login;
            user.name = items[u].name;
            user.avatar = items[u].avatar_url;
            user.getReposUrl = items[u].repos_url;
            user.profileUrl = items[u].html_url;

            result.push(user);
        }

        return {
            users: result,
            total: dto && dto["total_count"]
        };
    }
}

export default UserData;
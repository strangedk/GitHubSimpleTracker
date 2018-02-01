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
        let items = dto.items;

        items = [fakeUserAngular, fakeUserFB].concat(items);

        console.log(items);

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

const fakeUserAngular = {
  "login": "angular",
  "id": 139426,
  "avatar_url": "https://avatars3.githubusercontent.com/u/139426?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/angular",
  "html_url": "https://github.com/angular",
  "followers_url": "https://api.github.com/users/angular/followers",
  "following_url": "https://api.github.com/users/angular/following{/other_user}",
  "gists_url": "https://api.github.com/users/angular/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/angular/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/angular/subscriptions",
  "organizations_url": "https://api.github.com/users/angular/orgs",
  "repos_url": "https://api.github.com/users/angular/repos",
  "events_url": "https://api.github.com/users/angular/events{/privacy}",
  "received_events_url": "https://api.github.com/users/angular/received_events",
  "type": "Organization",
  "site_admin": false,
  "name": "Angular",
  "company": null,
  "blog": "https://angular.io",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "public_repos": 178,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2009-10-13T22:16:19Z",
  "updated_at": "2017-12-15T17:14:47Z"
};

const fakeUserFB = {
  "login": "facebook",
  "id": 69631,
  "avatar_url": "https://avatars3.githubusercontent.com/u/69631?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/facebook",
  "html_url": "https://github.com/facebook",
  "followers_url": "https://api.github.com/users/facebook/followers",
  "following_url": "https://api.github.com/users/facebook/following{/other_user}",
  "gists_url": "https://api.github.com/users/facebook/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/facebook/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/facebook/subscriptions",
  "organizations_url": "https://api.github.com/users/facebook/orgs",
  "repos_url": "https://api.github.com/users/facebook/repos",
  "events_url": "https://api.github.com/users/facebook/events{/privacy}",
  "received_events_url": "https://api.github.com/users/facebook/received_events",
  "type": "Organization",
  "site_admin": false,
  "name": "Facebook",
  "company": null,
  "blog": "https://code.facebook.com/projects/",
  "location": "Menlo Park, California",
  "email": null,
  "hireable": null,
  "bio": "We work hard to contribute our work back to the web, mobile, big data, & infrastructure communities. NB: members must have two-factor auth.",
  "public_repos": 178,
  "public_gists": 12,
  "followers": 0,
  "following": 0,
  "created_at": "2009-04-02T03:35:22Z",
  "updated_at": "2017-08-18T21:25:09Z"
};

export default UserData;
export const getUserRepos = (username: any) => {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    console.log('url', url);
    return fetch(url).then((res) => res.json());
}
class Github {
  constructor() {
    this.client_id = '93f4693a563b7a174ce7';
    this.client_secret = 'd8a810f7f81cd0cf34c4f62e1ab84f5c649057ab';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    // const repoResponse = await fetch(
    //   `https://api.github.com/users/${user}repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    // );

    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profileData = await profileResponse.json();
    const reposData = await repoResponse.json();
    return {
      profile: profileData,
      repos: reposData,
    };
  }
}

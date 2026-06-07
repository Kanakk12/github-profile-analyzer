const axios = require("axios");

const fetchGitHubProfile = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    }
  );
  return response.data;
};

module.exports = { fetchGitHubProfile };
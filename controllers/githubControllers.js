const { fetchGitHubProfile } = require("../services/githubService");
const {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
} = require("../models/profileModel");

const analyzeProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await fetchGitHubProfile(username);
    saveProfile(data, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB save failed" });
      }
      return res.status(200).json({
        message: "Profile analyzed and saved",
        data: {
          username: data.login,
          name: data.name,
          bio: data.bio,
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          profile_url: data.html_url,
          avatar_url: data.avatar_url,
          location: data.location,
          company: data.company,
          blog: data.blog,
          twitter_username: data.twitter_username,
          account_created_at: data.created_at,
        },
      });
    });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: "GitHub user not found" });
    }
    return res.status(500).json({ error: "Failed to fetch GitHub profile" });
  }
};

const listAllProfiles = (req, res) => {
  getAllProfiles((err, results) => {
    if (err) return res.status(500).json({ error: "DB fetch failed" });
    return res.status(200).json({ count: results.length, profiles: results });
  });
};

const getSingleProfile = (req, res) => {
  const { username } = req.params;
  getProfileByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: "DB fetch failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Profile not found in DB" });
    return res.status(200).json(results[0]);
  });
};

module.exports = { analyzeProfile, listAllProfiles, getSingleProfile };
const db = require("../config/db");

const saveProfile = (data, callback) => {
  const sql = `
    INSERT INTO profiles 
      (username, name, bio, public_repos, followers, following, 
       profile_url, avatar_url, location, company, blog, 
       twitter_username, account_created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      bio = VALUES(bio),
      public_repos = VALUES(public_repos),
      followers = VALUES(followers),
      following = VALUES(following),
      avatar_url = VALUES(avatar_url),
      location = VALUES(location),
      company = VALUES(company),
      blog = VALUES(blog),
      twitter_username = VALUES(twitter_username),
      account_created_at = VALUES(account_created_at),
      updated_at = CURRENT_TIMESTAMP
  `;
  const values = [
    data.login,
    data.name,
    data.bio,
    data.public_repos,
    data.followers,
    data.following,
    data.html_url,
    data.avatar_url,
    data.location,
    data.company,
    data.blog,
    data.twitter_username,
    data.created_at,
  ];
  db.query(sql, values, callback);
};

const getAllProfiles = (callback) => {
  db.query("SELECT * FROM profiles ORDER BY created_at DESC", callback);
};

const getProfileByUsername = (username, callback) => {
  db.query(
    "SELECT * FROM profiles WHERE username = ?",
    [username],
    callback
  );
};

module.exports = { saveProfile, getAllProfiles, getProfileByUsername };
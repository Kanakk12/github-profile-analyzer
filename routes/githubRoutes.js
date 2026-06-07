const express = require("express");
const router = express.Router();
const {
  analyzeProfile,
  listAllProfiles,
  getSingleProfile,
} = require("../controllers/githubControllers");

// POST: Analyze and store a GitHub profile
router.post("/analyze/:username", analyzeProfile);

// GET: All stored profiles
router.get("/profiles", listAllProfiles);

// GET: Single profile by username
router.get("/profiles/:username", getSingleProfile);

module.exports = router;
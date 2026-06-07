# GitHub Profile Analyzer API

Backend service to analyze GitHub profiles and store insights in MySQL.

## Tech Stack
- Node.js, Express.js, MySQL, GitHub API

## Setup Instructions

1. Clone the repo
   git clone https://github.com/YOUR_USERNAME/github-profile-analyzer.git

2. Install dependencies
   npm install

3. Create .env file
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=github_analyzer

4. Run MySQL and create database
   CREATE DATABASE github_analyzer;

5. Run the server
   npm run dev

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/github/analyze/:username | Fetch and store GitHub profile |
| GET | /api/github/profiles | Get all stored profiles |
| GET | /api/github/profiles/:username | Get single profile |

## Database Schema

CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  name VARCHAR(100),
  bio TEXT,
  public_repos INT,
  followers INT,
  following INT,
  profile_url VARCHAR(255),
  avatar_url VARCHAR(255),
  location VARCHAR(100),
  company VARCHAR(100),
  blog VARCHAR(255),
  twitter_username VARCHAR(100),
  account_created_at VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_username (username)
);

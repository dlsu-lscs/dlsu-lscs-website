#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Check if .git directory exists
const gitDir = path.join(__dirname, '..', '.git');
if (fs.existsSync(gitDir)) {
  try {
    execSync('lefthook install', { stdio: 'inherit' });
  } catch (error) {
    // Silently fail (matching the || true behavior)
    process.exit(0);
  }
}

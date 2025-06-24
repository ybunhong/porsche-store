#!/bin/bash

# Exit if any command fails
set -e

echo "🔧 Setting up Git configuration for this project..."


# Prompt for Git username and email
read -p "👤 Enter your Git user name: " git_username
read -p "📧 Enter your Git email: " git_email

# Set Git author info (optional, can be overridden globally)
git config user.name "$git_username"
git config user.email "$git_email"

# Enable rebase on pull (recommended for cleaner history)
git config pull.rebase true

# Optional: automatically stash uncommitted changes before rebase
git config rebase.autoStash true

# Optional: Set default branch name if initializing
git config init.defaultBranch main




echo "✅ Git setup completed."
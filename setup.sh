#!/bin/bash

# Exit if any command fails
set -e

echo "🔧 Setting up Git configuration for this project..."

git_ok=false
gitflow_ok=false
node_ok=false

# Checking for Git
echo "🔍 Checking for Git..."
echo ""
if command -v git &> /dev/null; then
  git_ok=true
  echo "✅  Git is installed: $(git --version)"
else
  echo "❌  Git is not installed."
  echo "👉  Install it from: https://git-scm.com/"
fi

# Checking for Git Flow
echo "🔍 Checking for Git Flow..."
echo ""
if command -v git-flow &> /dev/null; then
  gitflow_ok=true
  echo "✅  Git Flow is installed: $(git-flow version)"
else
  echo "❌  Git Flow is not installed."
  echo "👉  Install it from: https://github.com/nvie/gitflow/wiki/Installation"
fi

# Checking for Node.js
echo "🔍 Checking for Node.js..."
echo ""
if command -v node &> /dev/null; then
  node_ok=true
  echo "✅  Node.js is installed: $(node -v)"
else
  echo "❌  Node.js is not installed."
  echo "👉  Install it from: https://nodejs.org/"
fi

# Check all conditions
if [ "$git_ok" = true ] && [ "$gitflow_ok" = true ] && [ "$node_ok" = true ]; then
  echo ""
  echo "🎯  All preconditions met. Proceeding with Git setup..."

  read -p "👤  Enter your Git user name: " git_username
  read -p "📧  Enter your Git email: " git_email


  #config setting
  git config user.name "$git_username"
  git config user.email "$git_email"

  #prompt for git flow extension setup
  echo ""
  read -p "🚀 Do you want to initialize Git Flow in this repository? (y/n): " run_gitflow_init

  if [[ "$run_gitflow_init" == "y" || "$run_gitflow_init" == "Y" ]]; then
  echo "⚙️ Running git flow init..."
  git flow init
  else
  echo "ℹ️ Skipping git flow initialization."
  fi

  git config pull.rebase true
  git config rebase.autoStash true
  git config init.defaultBranch main

  echo "✅  Git setup completed for $git_username <$git_email>"
else
  echo ""
  echo "⚠️  Skipping Git setup because one or more requirements were not met."
  exit 1
fi

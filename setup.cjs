#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

function runCommand(command, options = {}) {
  try {
    return execSync(command, { stdio: "inherit", ...options });
  } catch (error) {
    return null;
  }
}

function checkCommand(command) {
  try {
    execSync(`${command} --version`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("🔧 Setting up Git configuration for this project...");

  // Run npm install
  console.log("Running npm install...");
  runCommand("npm install");
  console.log("✅ npm install successfully");

  let gitOk = false;
  let gitflowOk = false;
  let nodeOk = false;
  let reviewBoardOk = false;

  // Check Git
  console.log("\n🔍 Checking for Git...");
  if (checkCommand("git")) {
    gitOk = true;
    const version = execSync("git --version", { encoding: "utf8" }).trim();
    console.log(`✅ Git is installed: ${version}`);
  } else {
    console.log("❌ Git is not installed.");
    console.log("👉 Install it from: https://git-scm.com/");
  }

  // Check Git Flow
  console.log("\n🔍 Checking for Git Flow...");
  if (checkCommand("git-flow")) {
    gitflowOk = true;
    const version = execSync("git-flow version", { encoding: "utf8" }).trim();
    console.log(`✅ Git Flow is installed: ${version}`);
  } else {
    console.log(
      "⚠️ Git Flow is not installed. Git Flow is optional and setup will continue without it."
    );
    console.log("👉 To install it later: https://github.com/nvie/gitflow/wiki/Installation");
    gitflowOk = true; // Make it optional
  }

  // Check Node.js
  console.log("\n🔍 Checking for Node.js...");
  if (checkCommand("node")) {
    nodeOk = true;
    const version = execSync("node -v", { encoding: "utf8" }).trim();
    console.log(`✅ Node.js is installed: ${version}`);
  } else {
    console.log("❌ Node.js is not installed.");
    console.log("👉 Install it from: https://nodejs.org/");
  }

  // Check Review Board CLI
  console.log("\n🔍 Checking for rbt...");
  if (checkCommand("rbt")) {
    reviewBoardOk = true;
    const version = execSync("rbt --version", { encoding: "utf8" }).trim();
    console.log(`✅ Review Board CLI (rbt) is installed: ${version}`);
  } else {
    console.log("❌ Review Board CLI (rbt) is not installed. Install with: pipx install RBTools");
    process.exit(1);
  }

  if (gitOk && gitflowOk && nodeOk && reviewBoardOk) {
    console.log("\n🎯 All preconditions met. Proceeding with Git setup...");

    let currentGitUsername = "";
    let currentGitEmail = "";

    try {
      currentGitUsername = execSync("git config user.name", { encoding: "utf8" }).trim();
    } catch {}

    try {
      currentGitEmail = execSync("git config user.email", { encoding: "utf8" }).trim();
    } catch {}

    let gitUsername = "";
    let gitEmail = "";

    if (currentGitUsername && currentGitEmail) {
      console.log("🔎 Existing Git config found:");
      console.log(`   👤 Name: ${currentGitUsername}`);
      console.log(`   📧 Email: ${currentGitEmail}`);

      const useExisting = await question(
        "❓ Would you like to change your User_name👤 and 📧Email? (y to change / n to keep): "
      );
      if (useExisting.toLowerCase() === "n") {
        gitUsername = currentGitUsername;
        gitEmail = currentGitEmail;
      } else {
        gitUsername = await question("👤 Enter your new Git user name: ");
        gitEmail = await question("📧 Enter your new Git email: ");
      }
    } else {
      console.log("ℹ️ No existing Git user config found. Please enter new details.");
      gitUsername = await question("👤 Enter your Git user name: ");
      gitEmail = await question("📧 Enter your new Git email: ");
    }

    // Set Git config
    runCommand(`git config user.name "${gitUsername}"`);
    runCommand(`git config user.email "${gitEmail}"`);

    console.log("");
    const runGitflowInit = await question(
      "🚀 Do you want to initialize Git Flow in this repository? (y/n): "
    );

    if (runGitflowInit.toLowerCase() === "y") {
      console.log("⚙️ Running git flow init...");
      runCommand("git flow init -d");
    } else {
      console.log("ℹ️ Skipping git flow initialization.");
    }

    runCommand("git config pull.rebase true");
    runCommand("git config rebase.autoStash true");
    runCommand("git config init.defaultBranch main");

    console.log(`\n✅ Git setup completed for ${gitUsername} <${gitEmail}>`);
  } else {
    console.log("\n⚠️ Skipping Git setup because one or more requirements were not met.");
    process.exit(1);
  }

  rl.close();
}

main().catch(console.error);

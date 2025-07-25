# 🚗 Porsche Clone – Frontend Project

This is a **vanilla JavaScript**, **HTML**, and **CSS** project that replicates the frontend of the Porsche store. The goal is to build a highly modular, scalable, and professional-grade e-commerce UI **without using frontend frameworks** like React or Vue. This project is ideal for practicing modern web development techniques, mastering Git workflows, and understanding the architectural principles used in large-scale frontend applications.
---
## 📌 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [🚀 Getting Started](#-getting-started)
  - [✅ Prerequisites](#-prerequisites)
  - [🛠️ Installation](#️-installation)
  - [▶ Running the Development Server](#-running-the-development-server)
- [📁 Project Structure](#-project-structure)
- [📐 Information Architecture](#-information-architecture)
- [✍️ Code Conventions](#️-code-conventions)
- [🧹 Code Quality Tools](#-code-quality-tools)
  - [🎨 Prettier](#-prettier)
  - [🧪 ESLint](#-eslint)
- [🌿 Git Workflow & Branching](#-git-workflow--branching)
- [🧠 Common Development Tasks](#-common-development-tasks)
- [📚 Additional Resources](#-additional-resources)

🚀 Getting Started
Prerequisites
Before setting up the project, ensure you have the following installed:

Git: Check installation with git --version. If not installed, download from git-scm.com
Gitflow extension: Required for branch management
Node.js and npm: Download the latest LTS version from nodejs.org

Installation

Clone the Repository
bashgit clone <project-remote-repo-url>
cd <project-directory>

Run Setup Script
bashsh setup.sh
The setup script will:

Install dependencies using npm install
Check for required tools (git, git-flow, node)
Configure Git username and email
Initialize Git Flow (optional)
Apply useful Git configuration settings

Start Development Server
bashnpm run dev
This launches the project at http://localhost:3000 with hot module replacement (HMR) for real-time updates.

📁 Project Structure
Root Directories
├── public/                    # Static assets copied to the final build
├── src/
│   ├── assets/                # Images, icons, and font files
│   ├── components/            # Reusable Web Components (buttons, cards, etc.)
│   ├── data/                  # JSON files and mock API data
│   ├── layout/                # App-wide layout components (Header, Footer)
│   ├── pages/                 # Page-level views (Home, Product List, Wishlist)
│   ├── style/                 # Global styles, CSS variables, theme definitions
│   └── utils/                 # General utility functions (formatting, etc.)
├── .gitlab/                   # GitLab configuration (CI/CD, templates)
│   ├── merge_request_templates/
│   └── comment_templates/
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier code formatter configuration
├── vite.config.js             # Vite development server config
└── README.md                  # Project documentation
Folder Details

public/: Static files copied directly to build output
src/assets/: Static files imported in components/styles
src/components/: Small, reusable UI components
src/data/: JSON files and mock data
src/layout/: Main layout structure components
src/pages/: Page-level components for different views
src/style/: Global CSS, variables, themes
src/utils/: Helper functions and utilities

## Code Conventions

### Naming Conventions
| Type         | Convention                     Examples                          |
| ------------ | ------------------------------- -------------------------------- |
| Variables    | `camelCase`                    | `userName`,                     |
| Constants    | `UPPER_SNAKE_CASE`             | `MAX_RETRY_COUNT`,              |
| Functions    | `camelCase` (verb-based)       | `getUser()`, `fetchData`        |
| Classes      | `PascalCase`                   | `UserProfile`,                  |
| Files        | `kebab-case`                   | `login-form.js`, `user-profile. |
| Booleans     | `camelCase` with prefixes      | `isLoggedIn`, `hasPermission`,  |
### Function Prefixes

| Prefix  | Usage                        | Examples                        |
| ------- | -----------------------------| -------------------------------|
| `get`   | Fetch or retrieve data        | `getUser()`, `getValue()`       |
| `set`   | Assign or update values       | `setUser()`, `setTheme()`       |
| `update`| Modify existing data          | `updateProfile()`               |
| `delete`| Remove or clear data          | `deleteUser()`, `deleteItem()`  |
| `fetch` | Fetch data from API           | `fetchUsers()`                  |
| `handle`| Handle events or logic        | `handleLogin()`, `handleError()`|
| `on`    | Event handlers                | `onClick()`, `onHover()`        |
| `is`    | Boolean state check           | `isLoading()`, `isValid()`      |
| `has`   | Boolean ownership check       | `hasPermission()`, `hasToken()` |
| `can`   | Boolean capability check      | `canEdit()`, `canSubmit()`      |

---

### Comments

- Explain *what* the code does and *why* it does it that way — avoid restating obvious code.
- Use `TODO:` for incomplete tasks.
- Use `FIXME:` for known bugs.
- Keep comments up-to-date with code changes.
- Document functions, classes, and modules clearly with purpose, inputs, outputs, and side effects.

---

## Code Quality Tools

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}

🌿 Git Workflow
Branch Naming Convention
bash# Feature branches
git flow feature start <short-description>

# Example

git flow feature start "login-page"
Commit Message Format
<type>(<scope>): <subject>

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance tasks
  Development Workflow

Git Flow Commands
bash# Start feature
git flow feature start homepage

# Publish feature

git flow feature publish homepage

# Finish feature

git flow feature finish homepage

# Start release

git flow release start v1.0.0

# Start hotfix

git flow hotfix start v1.1.0

📚 Additional Resources

Git Flow Documentation : https://docs.google.com/document/d/1RKvA8cC2OWyCVmTVndzy7xoDjlUOyXCQm6uFsKVA5i8/edit?usp=sharing
Prettier Configuration
ESLint Rules
## Workflow (Git Convention)

Follow these steps to ensure smooth collaboration and consistent task tracking:

1. **Check the issue/task**  
   Review the issue or task assigned in the project spreadsheet to understand the requirements and priority.

2. **Create a task card and notify the team**  
   Create a task card (e.g., in your project management tool or issue tracker) and post it to the team’s Telegram channel to alert everyone about the upcoming work.

3. **Create a new branch**  
   Based on the issue, create a feature or bugfix branch using Git Flow or your branch naming conventions.

4. **Initialize the project structure**  
   Set up or adjust the project’s file and folder structure as needed to accommodate the task.

5. **Measure the scope of the issue**  
   Analyze the issue in detail to estimate the work involved and identify dependencies or blockers.

6. **Split the issue into sub-issues (optional)**  
   If the task is large or complex, break it down into smaller, manageable sub-issues for incremental progress and better tracking.

---

Following this workflow helps maintain transparency, encourages team communication, and improves task management efficiency.

# Git Strategy & Conventions

## Branch Naming Convention

- Format: `<name_type>` (lowercase with underscores)  
  Examples:  
  - `button_component`  
  - `home_page`  

- **Best Practices:**  
  - Be descriptive: branch names should clearly convey the purpose.  
  - Use underscores (or hyphens) to separate words for readability, e.g., `feature/login_page`.  
  - Keep names concise but meaningful.  
  - Include issue or ticket numbers if applicable, e.g., `bugfix/issue-123`.

---

## Commit Message Convention

We use [Commitlint](https://commitlint.js.org/) to enforce **Conventional Commit** style:

- Types include:  
  - `feat`: New feature  
  - `fix`: Bug fix  
  - `docs`: Documentation updates  
  - `style`: Formatting changes  
  - `refactor`: Code restructuring without feature or fix  
  - `test`: Adding or fixing tests  
  - `chore`: Maintenance tasks  
  - ...and others as per commitlint config  

- Subject must be lowercase.

---

## Merge Between Branches — GitLab UI Only

- **All merges must be done through GitLab’s UI** to ensure:  
  - Code is reviewed and approved.  
  - CI/CD pipelines pass before merging.  
  - Clear traceability of reviewers and mergers.  
  - Merge requests automatically close and link to issues.  
  - Consistent and visible team workflow.

**Do NOT merge via command line.** Always use GitLab UI to keep merges safe, standardized, and trackable.

---

## Git Conflict Resolution

### Common Conflict Scenarios and Solutions

1. **Rebase conflict**  
   - Occurs when rebasing commits onto a branch with conflicting changes.  
   - **Solution:** Manually resolve conflicts, then run:  
     ```
     git add <file>
     git rebase --continue
     ```

2. **Cherry-pick conflict**  
   - When cherry-picking commits that touch changed code.  
   - **Solution:** Fix manually, then:  
     ```
     git add <file>
     git cherry-pick --continue
     ```

3. **Edited file deleted remotely**  
   - You modified a file locally that was deleted in the remote branch.  
   - **Solution:** Decide whether to keep or delete the file:  
     - Keep: `git add <file>`  
     - Delete: `git rm <file>`  
     Then commit the change.

4. **Deleted file updated remotely**  
   - You deleted a file locally that was updated remotely.  
   - **Solution:** Choose to keep or delete:  
     - Keep updated file: `git add <file>`  
     - Continue deletion: `git rm <file>`  
     Then commit.

---

### Best Practice: Resolve Conflicts Locally

- Resolve merge conflicts on your development machine, not in GitLab UI.  
- Benefits:  
  - Test code and ensure nothing breaks.  
  - Use IDE tools for easier conflict resolution.  
  - Preserve conflict-resolution commits for traceability.  
  - Encourage responsibility for correctness.

**Conflict resolution steps:**

```bash
git fetch origin
git merge origin/develop  # or relevant target branch
# Fix conflicts locally in your editor
git add .
git commit -m "Resolve conflict with develop"
git push origin HEAD

## Contributing

Our team is composed of dedicated members who actively participate throughout all phases of the project, each contributing their expertise to ensure successful delivery.

- **Prak Dararith**  
  Responsible for overall team leadership. Actively participates in all project phases. Manages team meetings and decision-making processes to keep the team aligned with project goals.

- **Y Bunhong**  
  Oversees day-to-day project operations. Supports coordination across the team and contributes to all phases to maintain smooth workflow.

- **Gony Rida**  
  Engaged primarily in the design phase. Conducts research and ensures that design activities progress smoothly. Contributes throughout all project phases.

- **Lon Soknea**  
  Focuses on designing and developing visual elements and interactive features during the design phase. Participates actively in all project stages.

- **Khon Thida**  
  Involved in the design phase with a focus on visual and interactive element development. Engages in all phases of the project.

- **Chhun Channy**  
  Active contributor in the development phase. Designs and develops interactive and visual elements. Participates throughout all project phases.

- **Phal Channin**  
  Plays an active role in the development phase, focusing on creating visual and interactive components. Involved in all project stages.

- **Nan Sophal**  
  Engaged in development with responsibilities in designing and building interactive and visual features. Actively involved across all phases.

---

Note: This project uses Vite for development server. Do not manually open index.html in the browser - use npm run dev instead.


const fs = require("fs");
const path = require("path");

const BASE_DIR = "./src"; // or '.' for full project

const kebabCaseRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;

let hasError = false;

function isKebabCase(name) {
  return kebabCaseRegex.test(name);
}

function checkDir(dir) {
  const entries = fs.readdirSync(dir);

  entries.forEach(entry => {
    if (["index.html", "data.json", ".gitkeep"].includes(entry)) return;

    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    const nameWithoutExt = path.parse(entry).name;

    if (!isKebabCase(nameWithoutExt)) {
      console.error(`❌ Invalid name: ${fullPath}`);
      hasError = true;
    }

    if (stat.isDirectory()) {
      checkDir(fullPath);
    }
  });
}

console.log(`🔍 Checking names in: ${BASE_DIR}`);
checkDir(BASE_DIR);

if (hasError) {
  console.error("⛔ One or more file/folder names do not follow naming convention.");
  process.exit(1);
} else {
  console.log("✅ All file and folder names follow naming convention.");
}

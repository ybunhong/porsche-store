module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2, //0 is ignore, 1 is allow commit but show warining, 2 is block commit
      "always", //conditon
      ["feat", "fix", "docs", "refactor", "test", "ci", "king"], // Customize here
    ],
    "subject-case": [0], //always lower
  },
};

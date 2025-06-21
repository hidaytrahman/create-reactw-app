#!/usr/bin/env node

const degit = require("degit");
const { execSync } = require("child_process");
const path = require("path");

const [, , projectName] = process.argv;

if (!projectName) {
  console.error("❌ Please specify a project name:");
  console.log("   Example:");
  console.log("     npx create-reactw-app my-app");
  process.exit(1);
}

const emitter = degit("hidaytrahman/template-rtw", {
  cache: false,
  force: true,
  verbose: true,
});

console.log(`🚀 Creating a new RTW (React, Typescript with Webpack) app in ./${projectName}`);

emitter.clone(projectName).then(() => {
  console.log("✅ Project cloned successfully!");

  try {
    console.log("📦 Installing dependencies...");
    execSync(`cd ${projectName} && yarn install`, { stdio: "inherit" });
    console.log("🎉 All done!");
    console.log(`👉 Get started with:\n   cd ${projectName}\n   yarn start`);
  } catch (error) {
    console.error("❌ Failed to install dependencies.");
  }
}).catch((err) => {
  console.error("❌ Error cloning the repository:", err);
});

const { spawn, execSync } = require("node:child_process");

function runDevScript() {
  spawn("npm", ["run", "dev"], { stdio: "inherit" });
}

function runPostDevScripts() {
  execSync("npm run services:stop");
}

runDevScript();

process.on("SIGINT", () => {
  process.stdout.write("\n\n Finalizando serviços...\n");
  runPostDevScripts();
  process.exit(0);
});

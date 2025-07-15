require('dotenv').config();

async function Log(stack, level, pkg, message) {
  const accessToken = process.env.ACCESS_TOKEN;

  const allowedStacks = ["backend", "frontend"];
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  const allowedPackages = [
    "auth", "config", "middleware", "utils",
    "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
    "api", "component", "hook", "page", "state", "style"
  ];

  if (!allowedStacks.includes(stack) || !allowedLevels.includes(level) || !allowedPackages.includes(pkg)) {
    console.error("Invalid log parameters");
    return;
  }

  // Print log to terminal
  const logMsg = `[${new Date().toISOString()}] [${stack}] [${level}] [${pkg}] ${message}`;
  if (level === "error" || level === "fatal") {
    console.error(logMsg);
  } else if (level === "warn") {
    console.warn(logMsg);
  } else {
    console.log(logMsg);
  }

  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Logging failed:", err);
  }
}

module.exports = { Log };

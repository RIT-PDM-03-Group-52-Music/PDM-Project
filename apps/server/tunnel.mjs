import { spawn } from "child_process";

const sshUser = process.env.PGUSER;
const sshHost = process.env.SSH_HOST ?? "starbug.cs.rit.edu";
const localPort = process.env.PGPORT ?? "5432";
const remotePort = process.env.REMOTE_PGPORT ?? "5432";
const remoteHost = process.env.REMOTE_PGHOST ?? "127.0.0.1";

if (!sshUser) {
    console.error("PGUSER or SSH_USER must be set in .env");
    process.exit(1);
}

const args = ["-N", "-L", `${localPort}:${remoteHost}:${remotePort}`, `${sshUser}@${sshHost}`];

console.log(`Starting SSH tunnel to ${sshHost}...`);

const tunnel = spawn("ssh", args, {
    stdio: "inherit",
});

tunnel.on("error", (error) => {
    console.error("Failed to start SSH tunnel:", error.message);
    process.exit(1);
});

tunnel.on("exit", (code) => {
    if (code !== 0) {
        console.error(`SSH tunnel exited with code ${code}`);
        process.exit(code);
    }
});

process.on("SIGINT", () => tunnel.kill());
process.on("SIGTERM", () => tunnel.kill());

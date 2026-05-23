export default {
  apps: [{
    name: "speczabor",
    script: "server-node.mjs",
    env_file: ".env",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    },
    instances: 1,
    exec_mode: "fork",
    max_memory_restart: "500M",
    error_file: "/var/log/pm2/speczabor-error.log",
    out_file: "/var/log/pm2/speczabor-out.log",
    time: true
  }]
}

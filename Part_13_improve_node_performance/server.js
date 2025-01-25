const express = require("express");
const cluster = require("cluster");
const os = require("os");
const { off } = require("process");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // do nothing
  }
}
app.get("/", (req, res) => {
  res.send(`preformance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(5000);
  res.send(`timer example:${process.pid}`);
});

console.log("server.js is running on process id", process.pid);

// worker follows round robin algorithm
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  const NoOfWorkers = os.cpus().length;
  console.log(`Clustering to ${NoOfWorkers} CPUs`);
  for (let i = 0; i < NoOfWorkers; i++) {
    cluster.fork();
  }
} else {
  console.log(`Worker ${process.pid} started`);
  app.listen(3000);
}

// instead of using cluster module, we use pm2 module
// pm2 is a production process manager for Node.js applications with a built-in load balancer.
// pm2 commands list [can pass name in place of id]

// # Start an application
// pm2 start app.js              # Basic start
// pm2 start app.js --name="api" # Start with custom name
// pm2 start app.js -i 4        # Start in cluster mode with 4 instances

// # Process Management
// pm2 stop all                 # Stop all processes
// pm2 stop 0                   # Stop process with ID 0
// pm2 restart all              # Restart all processes
// pm2 reload all              # Zero-downtime reload
// pm2 delete all              # Delete all processes
// pm2 delete 0                # Delete process with ID 0

// # Monitoring
// pm2 list                    # List all processes
// pm2 monit                   # Monitor all processes
// pm2 show [app-name]         # Show detailed app info
// pm2 status                  # Display status of processes

// # Logs
// pm2 logs                    # Display logs for all processes
// pm2 logs [app-name]         # Display logs for specific app
// pm2 flush                   # Clear all logs

// # Startup
// pm2 startup                 # Generate startup script
// pm2 save                    # Save current process list
// pm2 resurrect              # Restore previously saved processes

// # Update PM2
// pm2 update                  # Update PM2 to the latest version
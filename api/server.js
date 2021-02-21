const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use(actionsRouter)
server.use(projectsRouter)


module.exports = server;

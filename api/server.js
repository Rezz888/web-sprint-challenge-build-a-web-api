const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router")

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use(actionsRouter)


module.exports = server;

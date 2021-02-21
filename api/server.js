const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use(actionsRouter)
server.use(projectsRouter)
server.use((err, req, res, next)=> {
    console.log(err)
    res.status(500).json({
        message: "something went wrong, please try again later"
    })
  })


module.exports = server;

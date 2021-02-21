// Write your "projects" router here!

const express = require("express")
const projects = require("./projects-model")

const router = express.Router()

router.get("/api/projects", (req, res)=> {
    projects.get()
    .then((project)=> {
        res.json(project)

    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            message: "There was an error"
        })
    })
})

router.get("/api/projects/:id", (req, res)=> {
    projects.get(req.params.id)
    .then((project)=> {
        if (project){
            res.json(project)
        } else {
            res.status(404).json({
                message: "The project couldn't be found"
            })
        }

        })
        .catch((err)=> {
           console.log(err)
           res.status(500).json({
              message: "There was an error"
           })
        })
    })

    router.post("/api/projects", (req, res)=> {
        if (!req.body.name || !req.body.description){
           return res.status(400).json({
                message: "missing name or description"
            })
        }
        
        projects.insert(req.body)
        .then((project)=> {
            res.status(201).json(project)
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({
              message: "There was an error"
            })
        })
    })

 
router.put("/api/projects/:id", (req, res)=> {
    projects.update(req.params.id, req.body)
     .then((project)=> {
        if(project){
            res.json(project)
        } else {
            res.status(404).json({
                message: "The project does not exist"
            })
        }
     })
     .catch((err)=> {
        console.log(err)
        res.status(500).json({
            message: "there was an error"
        })
    })
})

router.delete("/api/projects/:id", (req, res)=> {
    projects.remove(req.params.id)
     .then((count)=> {
        if (count > 0){
            res.json({
                message: "The project has been nuked"
            })
        } else {
            res.status(404).json({
                message: "The project could not be found",
            })
        }
     })
     .catch((err)=> {
        console.log(err)
        res.status(500).json({
            message: "there was an error"
        })
     })
})

router.get("/api/projects/:id/actions", (req, res)=> {
    projects.getProjectActions(req.params.id)
    .then((actions)=> {
        if (actions){
            res.json(actions)
        } else {
            res.status(404).json({
                message: "the project does not exist"
            })
        }
    })
    .catch((err)=> {
        console.log(err)
        res.status(500).json({
            message: "there was an error"
        })
    })
})


module.exports = router
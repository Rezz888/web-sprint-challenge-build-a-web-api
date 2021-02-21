// Write your "projects" router here!

const express = require("express")
const projects = require("./projects-model")
const { checkProjectData, checkProjectID } = require("../middleware/projects") 


const router = express.Router()

router.get("/api/projects", (req, res, next)=> {
    projects.get()
    .then((project)=> {
        res.json(project)

    })
    .catch(next)
})

router.get("/api/projects/:id", checkProjectID(), (req, res)=> {
//project gets attached to the request in checkProjectID
    res.json(req.project)

    })

    router.post("/api/projects", checkProjectData(), (req, res, next)=> {
        
        projects.insert(req.body)
        .then((project)=> {
            res.status(201).json(project)
        })
        .catch(next)
    })

 
router.put("/api/projects/:id", checkProjectData(), checkProjectID(), (req, res, next)=> {
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
     .catch(next)
})

router.delete("/api/projects/:id", checkProjectID(), (req, res, next)=> {
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
     .catch(next)
})

router.get("/api/projects/:id/actions", checkProjectID(), (req, res, next)=> {
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
    .catch(next)
    
})


module.exports = router
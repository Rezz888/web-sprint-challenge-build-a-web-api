// Write your "actions" router here!
const express = require("express")
const actions = require("./actions-model")

const router = express.Router()


router.get("/api/actions", (req, res)=> {
   actions.get()
    .then((actions)=> {
        res.json(actions)
    })
    .catch((err)=> {
       console.log(err)
       res.status(500).json({
           message: "there was an error retrieving the data",
       })
    })
})

router.get("/api/actions/:id", (req, res)=> {
    actions.get(req.params.id)
    .then((action)=> {
        if(action){
            res.json(action)
        } else {
            res.status(404).json({
                message: "The action does not exist"
            })
        }
    })
    .catch((err)=> {
        console.log(err)
        res.status(500).json({
           message: "there was an error",
        })
    })
})

router.post("/api/actions", (req, res)=> {
   if (!req.body.description || !req.body.notes || !req.body.project_id){
       return res.status(400).json({
           message: "missing description or notes or project_id"
       })
   }
    actions.insert(req.body)
        .then((action)=> {
            res.status(201).json(action)
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({
                message: "there was an error"
            })
        })
})
 
 router.put("/api/actions/:id", (req, res)=> {
     actions.update(req.params.id, req.body)
     .then((action)=> {
        if(action){
            res.json(action)
        } else {
            res.status(404).json({
                message: "The action does not exist"
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

 router.delete("/api/actions/:id", (req, res)=> {
     actions.remove(req.params.id)
     .then((count)=> {
        if (count > 0){
            res.json({
                message: "The action has been nuked"
            })
        } else {
            res.status(404).json({
                message: "The action could not be found",
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
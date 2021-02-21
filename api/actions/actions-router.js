// Write your "actions" router here!
const express = require("express")
const actions = require("./actions-model")
const { checkActionID, checkActionData } = require("../middleware/actions")

const router = express.Router()


router.get("/api/actions", (req, res, next)=> {
   actions.get()
    .then((actions)=> {
        res.json(actions)
    })
    .catch(next)
    // This is shorthand for the below code (commented out)
    // .catch((err)=> {
    //    next(err)
    // })
})

router.get("/api/actions/:id", checkActionID(), (req, res)=> {
    // action gets attached to the request in checkActionID
    res.json(req.action)
})

router.post("/api/actions", checkActionData(), (req, res, next)=> {
    
    actions.insert(req.body)
        .then((action)=> {
            res.status(201).json(action)
        })
        .catch((err)=> {
            next(err)
        })
})
 
 router.put("/api/actions/:id", checkActionData(), checkActionID(), (req, res, next)=> {
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
        next(err)
    })
 })

 router.delete("/api/actions/:id", checkActionID(), (req, res, next)=> {
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
        next(err)
     })
 })

module.exports = router
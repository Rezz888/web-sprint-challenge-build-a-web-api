const actions = require("../actions/actions-model")

function checkActionData(){
    return (req, res, next)=> {
        if (!req.body.description || !req.body.notes || !req.body.project_id){
            return res.status(400).json({
                message: "missing description or notes or project_id"
            })
        }
        next()
    }
}

function checkActionID(){
    return (req, res, next) => {
        actions.get(req.params.id)
    .then((action)=> {
        if(action){
            // res.json(action)
            req.action = action
            next()
        } else {
            res.status(404).json({
                message: "The content does not exist"
            })
        }
    })
    .catch((err)=> {
        console.log(err)
        res.status(500).json({
           message: "there was an error",
        })
    })
    }
}

module.exports = {
    checkActionID,
    checkActionData,
}
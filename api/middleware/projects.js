const projects = require("../projects/projects-model")

function checkProjectData(){
    return (req, res, next)=> {
        if (!req.body.name || !req.body.description){
            return res.status(400).json({
                 message: "missing name or description"
             })
         }
         next()
    }
}

function checkProjectID(){
    return (req, res, next)=> {
        projects.get(req.params.id)
        .then((project)=> {
            if (project){
                // res.json(project)
                req.project = project
                next()
            } else {
                res.status(404).json({
                    message: "The content couldn't be found"
                })
            }
    
            })
            .catch((err)=> {
               console.log(err)
               res.status(500).json({
                  message: "There was an error"
               })
            })
    }
}

module.exports = {
    checkProjectData,
    checkProjectID
}
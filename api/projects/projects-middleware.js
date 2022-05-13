const Projects = require('./projects-model')
// add middlewares here related to projects


function validateId(req, res, next) {
    const {id} = req.params
    Projects.get(id)
        .then(result => {
            if(result ==null){
                res.status(404).json({message: "ID not found"})
                return
            }else{
                req.project=result
                next();
            }
        })
}

function validateProject(req, res, next) {
    const {name, description} = req.body
    if(typeof name != 'string' || name == '' || typeof description != 'string' || description ==''){
        res.status(400).json({message: "name and description required for a new project!"})
        return
    }else{
        next()
    }
}



module.exports ={validateId, validateProject}
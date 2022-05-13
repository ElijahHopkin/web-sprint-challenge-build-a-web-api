// add middlewares here related to actions
const Actions = require('./actions-model')

function validateActionId(req, res, next) {
    const {id} = req.params
    Actions.get(id)
    .then(result => {
        if(result) {
            req.action = result
            next();
        }else{
            res.status(404).json({message: "ID not found"})
        }
    })
}






module.exports= {validateActionId}

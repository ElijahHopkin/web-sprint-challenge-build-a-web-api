// add middlewares here related to actions
const Actions = require('./actions-model')

function validateActionId(req, res, next) {
    const {id} = req.params
    Actions.get(id)
    .then(result => {
        if(result == null) {
            res.status(404).json({message: "ID not found"})
            return
        }else{
            req.action = result
            next();
        }
    })
}

function validateAction(req, res, next) {
    const {description, notes} = req.body
  if(typeof description != 'string' || description == '' || 
  typeof notes != 'string' || notes == '' ) {
      res.status(400).json({message: 'description, and notes are required'})
      return
  }else{
      next();
  }
}






module.exports= {validateActionId, validateAction}

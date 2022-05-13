// Write your "actions" router here!
const express = require ('express');
const router = express.Router();

const Actions = require('./actions-model');
const {validateActionId, validateAction} = require('./actions-middlware');

router.get('/', (req, res) => {
    Actions.get()
    .then(results => {
        res.json(results)
    })
})

router.get('/:id', validateActionId, (req, res) => {
        res.json(req.action)
})

router.post('/', validateAction, (req, res) => {
    const newAction= {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes
    }
    Actions.insert(newAction)
    .then(results => {
        res.status(201).json(results)
    })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(results => {
        res.json(results)
    })
})

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id) 
    .then(results => {
        res.json(req.action)
    })
})

module.exports = router;
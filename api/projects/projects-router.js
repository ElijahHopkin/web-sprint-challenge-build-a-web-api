// Write your "projects" router here!
const express = require('express');

const router = express.Router();

const Projects= require('./projects-model')
const {validateId, validateProject} = require('./projects-middleware')


router.get('/', (req, res) => {
    Projects.get()
    .then(results => {
        res.json(results)
    })
})

router.get('/:id', validateId, (req, res)=> {
    res.json(req.project)
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(results => {
        res.status(201).json(results)
    })
})

router.put('/:id', validateId, validateProject, (req, res) => {
    const completed = req.body.completed
    if(completed===true || completed===false){
        Projects.update(req.params.id, req.body)
        .then(results => {
            res.json(results)
        })
    }else{
        res.status(400).json({message: 'name, description, and completed status required'})
    }
})

router.delete('/:id', validateId, (req, res) => {
    const {id} = req.params
    Projects.remove(id)
    .then(results => {
        if(results) {
            res.json(req.project)
        }
    })
})

router.get('/:id/actions', validateId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(results => {
        res.json(results)
    })
})


module.exports = router;

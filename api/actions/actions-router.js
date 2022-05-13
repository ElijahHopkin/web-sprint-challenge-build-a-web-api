// Write your "actions" router here!
const express = require ('express');
const router = express.Router();

const Actions = require('./actions-model');
const {validateActionId} = require('./actions-middlware');

router.get('/:id', (req, res) => {
    res.json(req.action)
})


module.exports = router;
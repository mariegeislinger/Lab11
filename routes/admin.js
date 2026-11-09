const express = require('express')
const router = express.Router()
const Feedback = require('../models').Feedback

router.get('/', function(req, res, next) {
    Feedback.findAll().then(allFeedback => {
        return res.render('admin', {feedback: allFeedback})
    })
})

module.exports = router
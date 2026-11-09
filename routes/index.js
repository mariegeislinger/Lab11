const express = require('express')
const router = express.Router()
const databaseModels = require('../models')
const Feedback = databaseModels.Feedback

router.get('/', function(req, res, next) {
    res.render('index', {title: '', author: ''})
})

router.get('/feedback-form', function(req, res, next) {
    res.render('student_feedback_form')
})

router.post('/submit-feedback', async function(req, res, next) {

    const formData = req.body
    const comments = req.body.comments
    let newFeedback
    let departmentList

    try {
        newFeedback = await Feedback.create(formData) 
        res.render('thank_you', { ...formData }) 
    }

    catch (error) { 
        console.error(`Failed saving feedback to database because ${error}`, formData) 
        res.locals.message = 'Error saving feedback. Please try again later'
        return next() 
    }

    try {
        console.log('Making LLM request for comments', comments)
        departmentList = await identifyDepartments(comments)

        if (departmentList.length == 0) {
            departmentList = ['General College Feedback']
        }

        console.log(departmentList)

    } catch (error) {
        console.error(`Failed LLM identification of departments for comments "${comments}" because ${error}`) 
        return 
    }

    try {

        console.log('Updating database with departments', departmentList)

        await Feedback.update(
            { departments: departmentList },
            { where: { id: newFeedback.id } }
        )

    } catch (error) {
        console.error(`Failed saving departments for feedback ID "${newFeedback.id}" because ${error}`) 
    }
})

module.exports = router